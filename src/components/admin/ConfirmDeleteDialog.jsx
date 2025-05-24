import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function ConfirmDeleteDialog({
  open,
  setOpen,
  onConfirm,
  title = "Delete Data",
  description = "Are you sure you want to delete this data? This action cannot be undone.",
  loading = false,
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-sm">
        <DialogHeader className="flex flex-col items-center text-center space-y-2">
          <div className="bg-red-100 p-3 rounded-full">
            <AlertTriangle className="text-red-600" size={32} />
          </div>
          <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="delete"
            onClick={() => onConfirm()}
            disabled={loading}
            className={loading ? "cursor-not-allowed" : "cursor-pointer"}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
