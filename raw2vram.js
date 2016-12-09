#!/usr/bin/env node

process.stdin.once('readable', () => {
	var v = 128;
	var byte1 = 0,
		byte2 = 0;

	var buf = Buffer.from(process.stdin.read());
	for (var value of buf.values()) {
		if (v === 0) {
			console.log('$' + ('00' + byte1.toString(16)).slice(-2));
			console.log('$' + ('00' + byte2.toString(16)).slice(-2));
			v = 128;
			byte1 = byte2 = 0;
		};
		
		if (value > 1) byte2 += v;
		byte1 += v * (value & 0x01);

		v = Math.floor(v / 2);
	}
});