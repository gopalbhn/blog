import { X } from "lucide-react";

export default function DeleteConfirmModal({
    isOpen,
    onClose,
    onDelete,
    itemName = "this item",
}) {
    if (!isOpen) return null;
    console.log("modal", itemName)
    console.log("onDelete", onDelete)
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
                <div className="p-6">
                    {/* Optional Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 rounded-md p-1 text-gray-500 hover:bg-gray-100"
                    >
                        <X size={18} />
                    </button>

                    {/* Title */}
                    <h2 className="mb-3 font-heading text-2xl font-semibold text-[var(--color-secondary)]">
                        Are you absolutely sure?
                    </h2>

                    {/* Message */}
                    <p className="text-sm leading-6 text-[var(--color-secondary-hover)]">
                        This action cannot be undone. This will permanently
                        delete{" "}
                        <span className="font-medium text-[var(--color-secondary)]">
                            {itemName}
                        </span>.

                    </p>

                    {/* Actions */}
                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-[var(--color-secondary)] transition hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={onDelete}
                            className="rounded-lg bg-[var(--color-primary)] px-5 py-2.5 font-medium text-white transition hover:bg-[var(--color-primary-hover)]"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}