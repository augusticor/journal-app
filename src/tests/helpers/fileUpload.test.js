import { fileUpload } from "../../helpers/fileUpload";
import cloudinary from "cloudinary";

cloudinary.config({
	cloud_name: "dg2nreez0",
	api_key: "278428773349574",
	api_secret: "mDsLiMBQSL9P5NGLn2sUxtyH2DY",
	secure: true,
});

describe("Tests on file upload to cloudinary", () => {
	test("Should upload a file and return the URL matching the pattern", async () => {
		const resp = await fetch("https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg");
		const blob = await resp.blob();

		const file = new File([blob], "tree.jpg");

		const url = await fileUpload(file);

		expect(url).toMatch(/https:\/\/res.cloudinary.com\/dg2nreez0\/image\/upload\/v\d*\/\w*.jpg/);

		//delete image after upload by ID
		const urlSegments = url.split("/");
		const imageId = urlSegments[urlSegments.length - 1].replace(".jpg", "");
		cloudinary.v2.api.delete_resources(imageId);
	});

    //
	test("Should return an error", async () => {
		const file = new File([], "foto.png");
		const url = await fileUpload(file);

		expect(url).toBe(null);
	});
});
