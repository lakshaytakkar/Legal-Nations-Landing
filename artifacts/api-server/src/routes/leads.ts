import { Router, type IRouter } from "express";

const router: IRouter = Router();

router.post("/leads", (req, res) => {
  const lead = req.body;
  console.log("[leads] New lead captured:", JSON.stringify(lead, null, 2));
  res.json({ success: true });
});

export default router;
