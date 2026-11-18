// Card action buttons (Edit, Delete) and delete confirmation dialog for Admins.
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import DatasetModal from "./DatasetModal";

type DatasetProps = {
  id: string;
  name: string;
  description?: string | null;
  category: string;
  source: string;
};

export default function DatasetCardActions({ dataset }: { dataset: DatasetProps }) {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      const res = await fetch(`/api/datasets/${dataset.id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete dataset");
      }

      toast.success("Dataset deleted successfully");
      setDeleteOpen(false);
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setEditOpen(true)}
          className="text-xs font-medium text-gray-500 hover:text-blue-600 transition"
        >
          Edit
        </button>
        <span className="text-gray-300">&middot;</span>
        <button
          onClick={() => setDeleteOpen(true)}
          className="text-xs font-medium text-gray-500 hover:text-red-600 transition"
        >
          Delete
        </button>
      </div>

      {/* Edit Modal */}
      {editOpen && (
        <DatasetModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          dataset={dataset}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteOpen && (
        <Modal
          open={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          title="Delete Dataset"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Are you sure you want to delete <b>{dataset.name}</b>?
            </p>
            <p className="text-xs text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
              This action cannot be undone. All associated records, table fields, and permissions will be permanently removed.
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <Button
                variant="secondary"
                onClick={() => setDeleteOpen(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button variant="danger" loading={loading} onClick={handleDelete}>
                Confirm Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
