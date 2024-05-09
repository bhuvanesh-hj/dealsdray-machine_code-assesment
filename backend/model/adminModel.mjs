import mongoose from "mongoose";

const userAdminSchema = mongoose.Schema(
	{
		username: { type: "string", required: true, unique: true },
		password: { type: "string", required: true },
	},
	{
		timestamps: true,
	}
);

const UserAdmin = mongoose.model("UserAdmin", userAdminSchema);

export default UserAdmin;
