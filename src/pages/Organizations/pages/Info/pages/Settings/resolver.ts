import { z } from "zod";

export const updatePasswordResolver = z
	.object({
		phone: z.string().min(1),
		currentPassword: z.string().min(1),
		password: z.string().min(6),
		cpassword: z.string().min(6),
	})
	.refine((data) => data.password === data.cpassword, {
		message: `Passwords don't match`,
		path: ["cpassword"],
	});
