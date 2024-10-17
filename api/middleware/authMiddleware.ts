const supabase = require("../database/supabaseClient"); // Make sure this points to the correct Supabase client setup
import { User } from "@supabase/supabase-js";
import { Request, Response, NextFunction } from "express";
interface AuthenticatedRequest extends Request {
	user?: User; // Add the optional user property
}
const authenticateUser = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		// Expecting Authorization header as 'Bearer TOKEN'
		const token = req.headers["authorization"]?.split(" ")[1];

		if (!token) {
			return res.status(401).json({ message: "No token provided" });
		}

		// Get user information from Supabase
		const { data, error } = await supabase.auth.getUser(token);

		if (error || !data.user) {
			return res.status(401).json({ message: "Unauthorized: Invalid token" });
		}

		// Attach the user object to the request
		req.user = data.user;

		// Call the next middleware/route handler
		next();
	} catch (err) {
		console.error("Authentication error:", err);
		return res
			.status(500)
			.json({ message: "Server error during authentication" });
	}
};

export default authenticateUser;
