// Modal dialog for Admin to create or edit a dataset.
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

type DatasetData = {
  id?: string;
  name: string;
  description?: string | null;
  category: string;
  source: string;
};

type DatasetModalProps = {
  open: boolean;
  onClose: () => void;
  dataset?: DatasetData | null; // If passed, we are in Edit mode; otherwise Create mode
};

export default function DatasetModal({ open, onClose, dataset }: DatasetModalProps) {
  const router = useRouter();
  const isEditing = Boolean(dataset?.id);

  const [name, setName] = useState(dataset?.name || "");
  const [description, setDescription] = useState(dataset?.description || "");
  const [category, setCategory] = useState(dataset?.category || "");
  const [source, setSource] = useState(dataset?.source || "");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!name.trim() || !category.trim() || !source.trim()) {
      toast.error("Please fill in Name, Category, and Source");
      return;
    }

    setLoading(true);

    try {
      const url = isEditing ? `/api/datasets/${dataset!.id}` : "/api/datasets";
      const method = isEditing ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, category, source }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Operation failed");
      }

      toast.success(isEditing ? "Dataset updated successfully" : "Dataset created successfully");
      onClose();
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEditing ? `Edit Dataset: ${dataset?.name}` : "Create New Dataset"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
        <Input
          label="Dataset Name"
          placeholder="e.g. Customers, Inventory, Orders"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Description</label>
          <textarea
            className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Brief overview of what records this dataset contains"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <Input
          label="Category"
          placeholder="e.g. Sales, Support, Operations"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <Input
          label="Data Source"
          placeholder="e.g. CRM export, Production DB, Billing API"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          required
        />

        <div className="flex items-center justify-end gap-3 mt-4 pt-3 border-t border-gray-100">
          <Button type="button" variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            {isEditing ? "Save Changes" : "Create Dataset"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
