// Reads the pixel dimensions of a JPEG file without any dependency.
// Parses the start of frame markers (SOF0 to SOF15, excluding the
// differential and lossless types) and returns { width, height }.

import { open } from 'node:fs/promises';

const SOF_MARKERS = new Set([
  0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf,
]);

export async function readJpegSize(filePath) {
  const handle = await open(filePath, 'r');
  try {
    const { size } = await handle.stat();
    const buffer = Buffer.alloc(Math.min(size, 65536));
    const { bytesRead } = await handle.read(buffer, 0, buffer.length, 0);

    if (bytesRead < 4 || buffer.readUInt16BE(0) !== 0xffd8) {
      throw new Error(`Not a JPEG file: ${filePath}`);
    }

    let offset = 2;
    while (offset + 9 < bytesRead) {
      if (buffer[offset] !== 0xff) {
        offset += 1;
        continue;
      }
      const marker = buffer[offset + 1];
      // Standalone markers carry no length payload.
      if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
        offset += 2;
        continue;
      }
      const length = buffer.readUInt16BE(offset + 2);
      if (SOF_MARKERS.has(marker)) {
        return {
          height: buffer.readUInt16BE(offset + 5),
          width: buffer.readUInt16BE(offset + 7),
        };
      }
      offset += 2 + length;
    }
    throw new Error(`No JPEG frame marker found: ${filePath}`);
  } finally {
    await handle.close();
  }
}
