// Header button that opens the Create Dataset modal for Admins.
"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import DatasetModal from "./DatasetModal";

export default function CreateDatasetButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} className="flex items-center gap-2">
        <span className="text-base leading-none">+</span>
        <span>Create Dataset</span>
      </Button>

      {open && <DatasetModal open={open} onClose={() => setOpen(false)} />}
    </>
  );
}
