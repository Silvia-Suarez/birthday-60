import express from "express";
import cors from "cors";
import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

// List recent media by upload preset (folder/tag)
app.get("/media/:type", async (req, res) => {
  try {
    const { type } = req.params; // 'party' | 'old_memories'
    if (!["party", "old_memories"].includes(type)) {
      return res.status(400).json({ error: "Invalid type" });
    }

    // Use search expression based on preset used during unsigned upload.
    // By default, unsigned upload with preset can add a tag equal to the preset name if configured.
    // Fallback to folder name matching if you configured upload preset to save to a folder.
    const expression = `(folder:${type})`;
    const result = await cloudinary.search
      .expression(expression)
      .sort_by("created_at", "desc")
      .max_results(50)
      .execute();

    const resources = (result.resources || []).map((r) => ({
      public_id: r.public_id,
      format: r.format,
      secure_url: r.secure_url,
      resource_type: r.resource_type,
      thumbnail_url: cloudinary.url(r.public_id, {
        width: 400,
        height: 400,
        crop: "fill",
        format: "jpg",
      }),
    }));

    res.json({ resources });
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch media" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
