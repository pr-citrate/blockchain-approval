import {NextResponse} from "next/server";
import {Block, PrismaClient} from "@prisma/client";
import merkle from "merkle";
import {getVersion} from "@/utils/blockchain";

const prisma: PrismaClient = new PrismaClient();

export async function POST(): Promise<NextResponse> {
    const tree = merkle('sha256').sync([]);
    const result: Block = await prisma.block.create({
        data: {
            version: getVersion(),
            previousHash: '0'.repeat(64),
            timestamp: new Date(),
            body: 'Genesis Block',
            merkleRoot: tree.root() || '0'.repeat(64),
            bits: 0,
            nonce: 0,
        }
    });

    return NextResponse.json(result);
}