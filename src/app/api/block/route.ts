import {NextResponse} from "next/server";
import {Block, PrismaClient} from "@prisma/client";
import {createHash, getVersion} from "@/utils/blockchain";
import merkle from "merkle";

const prisma: PrismaClient = new PrismaClient();

export async function GET(): Promise<NextResponse> {
    const result: Block[] = await prisma.block.findMany();
    return NextResponse.json(result);
}

interface RequestData {
    body: string;
}

export async function POST(req: Request): Promise<NextResponse> {
    const data: RequestData = await req.json();
    const prevBlock: Block = await prisma.block.findFirstOrThrow({orderBy: {index: 'desc'}});
    const tree = merkle('sha256').sync([data.body]);

    console.log(data)
    const result: Block = await prisma.block.create({
        data: {
            previousHash: createHash(prevBlock),
            merkleRoot: tree.root() || '0'.repeat(64),
            timestamp: new Date(),
            bits: 0,
            nonce: 0,
            body: data.body,
        }
    });

    return NextResponse.json(result);
}