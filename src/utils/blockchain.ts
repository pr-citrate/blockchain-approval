import crypto from 'crypto-js';
import type {Block} from "@prisma/client";

export function createHash(block: Block): string {
    return crypto.SHA256(JSON.stringify(block)).toString();
}

export function getVersion(): string {
    return '1.0.0';
}