import { Router } from "express";
import { handleTranscript } from "../controllers/transcriptController";

const router = Router();

router.post("/", handleTranscript);

export default router;
