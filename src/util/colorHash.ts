const getSeed = (input: string) => input.split('').reduce((res, char) => res + char.charCodeAt(0), 0)

const HSL2RGB = (H: number, S: number, L: number) => {
	H /= 360

	const q = L < 0.5 ? L * (1 + S) : L + S - L * S
	const p = 2 * L - q

	return [H + 1 / 3, H, H - 1 / 3].map((color) => {
		if (color < 0) {
			color++
		}
		if (color > 1) {
			color--
		}
		if (color < 1 / 6) {
			color = p + (q - p) * 6 * color
		} else if (color < 0.5) {
			color = q
		} else if (color < 2 / 3) {
			color = p + (q - p) * 6 * (2 / 3 - color)
		} else {
			color = p
		}
		return Math.round(color * 255)
	})
}

const colorHash = (input: string) => {
	const seed = getSeed(input)
	
	const h = (seed + 120) % 359
	const l = 0.4 + Math.abs(Math.cos(seed)) * 0.5
	const s = 0.5 + Math.abs(Math.sin(seed)) * 0.5

	const [r, g, b] = HSL2RGB(h, s, l)

	return ((r&0x0ff)<<16)|((g&0x0ff)<<8)|(b&0x0ff)
}

export default colorHash