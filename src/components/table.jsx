import { useState } from "react";
import {
  MoreVertical,
  Trash,
  Plus,
  Pen,
  Eye,
  UserPlus,
  UserMinus,
  Shield,
  Star,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import Button from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DeleteConfirmModal from "./DeleteConfirm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import WriteSuggestion from "./admin/WriteSuggestion";

export default function UnifiedTable({
  type,
  variant,
  data = [],
  onAction,
}) {
  const [openPopoverId, setOpenPopoverId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [reviewOpen, setReviewOpen] = useState(false)
  const navigate = useNavigate();

  const handleAction = (action, item) => {
    onAction?.(action, item);
    setOpenPopoverId(null);
  };

  function handleDelete() {
    if (!deleteTarget) {
      return
    }
    if (type === "user") {
      handleUserRemove(deleteTarget.id)
    }
    if (type === "post") {
      handlePostRemove(deleteTarget.id)
    }
    setDeleteTarget(null)
    setShowConfirm(false)
  }

  async function handleFeaturedPost(id) {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/admin/feature/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
    const data = await res.json();
    if (data.success) {
      toast.success(data.message)
      setTimeout(() => {
        window.location.reload();
      }, 500)
    }
    else {
      toast.error(data.message)
    }
  }

  async function handleUnFeaturePost(id) {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/admin/unfeature/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
    const data = await res.json();
    if (data.success) {
      toast.success(data.message)
      setTimeout(() => {
        window.location.reload();
      }, 500)
    }
  }
  async function handlePostRemove(id) {
    setDeleteTarget(id)
    setShowConfirm(true)
    console.log('id del', id)
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/admin/delete-post/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (data.success) {
      toast.success(data.message)
      setTimeout(() => {
        window.location.reload()
      }, 500)
    }
    else {
      toast.error(data.message)
    }
  }
  async function handlePostPublish(id) {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/admin/publish-post/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
    const data = await res.json();
    if (data.success) {
      toast.success(data.message)
      setTimeout(() => {
        window.location.reload();
      }, 500)
    }
  }
  async function handleUserRemove(id) {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/admin/delete-user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
    const data = await res.json();
    if (data.success) {
      toast.success(data.message)
      setTimeout(() => {
        window.location.href = "/admin/users"
      }, 1000)
    } else {
      toast.error(data.message)
    }
  }


  async function handleDemoteUser(id) {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/admin/demote-user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
    const data = await res.json();
    if (data.success) {
      toast.success(data.message)
      setTimeout(() => {
        window.location.reload();
      }, 500)
    }
  }

  async function handlePromoteUser(id) {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/admin/promote-user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
    const data = await res.json();
    if (data.success) {
      toast.success(data.message)
      setTimeout(() => {
        window.location.reload();
      }, 500)
    }
  }
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-background-light shadow-sm">
      <DeleteConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onDelete={() => handleDelete()}
        itemName={deleteTarget ? deleteTarget.name : ""}
      />
      <WriteSuggestion open={reviewOpen} close={() => setReviewOpen(false)} />
      <Table>
        <TableHeader className="border-b border-gray-300">
          {type === "user" ? (
            <TableRow>
              <TableHead className="text-left text-small font-semibold text-gray-900 uppercase">
                Name
              </TableHead>

              <TableHead className="text-center text-small font-semibold text-gray-900 uppercase">
                Email
              </TableHead>

              <TableHead className="text-center text-small font-semibold text-gray-900 uppercase">
                Role
              </TableHead>

              <TableHead className="text-center text-small font-semibold text-gray-900 uppercase">
                Action
              </TableHead>
            </TableRow>
          ) : (
            <TableRow>
              <TableHead className="text-left text-small font-semibold text-gray-900 uppercase">
                Title
              </TableHead>

              <TableHead className="text-center text-small font-semibold text-gray-900 uppercase">
                Category
              </TableHead>

              <TableHead className="text-center text-small font-semibold text-gray-900 uppercase">
                Status
              </TableHead>

              <TableHead className="text-center text-small font-semibold text-gray-900 uppercase">
                Date
              </TableHead>

              <TableHead className="text-center text-small font-semibold text-gray-900 uppercase">
                Action
              </TableHead>
            </TableRow>
          )}
        </TableHeader>

        <TableBody>


          {type === "user" &&

            data.map((user) => (
              <TableRow
                key={user._id}
                className="border-b border-gray-200 last:border-0"
              >
                <TableCell className="text-left text-small text-gray-900">
                  {user.name}
                </TableCell>

                <TableCell className="text-center text-small text-gray-600">
                  {user.email}
                </TableCell>

                <TableCell className="text-center text-small text-gray-900">
                  <Badge variant="outline">{user.role}</Badge>
                </TableCell>

                <TableCell className="text-center">
                  <Popover
                    open={openPopoverId === user._id}
                    onOpenChange={(open) =>
                      setOpenPopoverId(open ? user._id : null)
                    }
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-lg p-2 hover:bg-gray-100"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent
                      align="end"
                      className="w-48 overflow-hidden rounded-xl border border-gray-200 bg-background-light shadow-lg p-0"
                    >
                      <div className="flex flex-col">
                        {variant === "admin" && (
                          <>
                            <button
                              onClick={() => {
                                setDeleteTarget({ type: "user", id: user._id })
                                setShowConfirm(true)
                                setOpenPopoverId(null)
                              }}
                              className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm hover:bg-red-500/10 hover:text-red-500"
                            >
                              <Trash className="h-4 w-4" />
                              Remove
                            </button>
                            {user.role == "Reader" ? (
                              <button
                                onClick={() => {
                                  handlePromoteUser(user._id)
                                  setOpenPopoverId(null)
                                }}
                                className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-gray-50"
                              >
                                <Plus className="h-4 w-4" />
                                Promote to Author
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  handleDemoteUser(user._id)
                                  setOpenPopoverId(null)
                                }}
                                className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-gray-50"
                              >
                                <UserMinus className="h-4 w-4" />
                                Demote User
                              </button>
                            )}
                          </>
                        )}


                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}

          {/* ================= POST TABLE ================= */}

          {type === "post" &&
            data.map((post) => (
              <TableRow
                key={post._id}
                className="border-b border-gray-200 last:border-0"
              >
                <TableCell className="text-left text-small text-gray-900 ">
                  {post.title}
                </TableCell>

                <TableCell className="text-center text-small text-gray-900">
                  {post.category}
                </TableCell>

                <TableCell className="text-center text-small text-gray-900">
                  {post.status === "pending" ? (
                    <Badge variant={"pending"} className="text-center capitalize">
                      <span className="h-2 w-2 rounded-full bg-yellow-500/50 animate-pulse duration-150" />
                      {post.status}</Badge>

                  ) : (
                    <Badge variant={"published"} className="text-center capitalize">
                      <span className="h-2 w-2 rounded-full bg-green-500/50 animate-pulse duration-150" />
                      {post.status}</Badge>

                  )}
                </TableCell>

                <TableCell className="text-center text-small text-gray-900">
                  {new Date(post.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell className="text-center">
                  {variant === "admin" ? (
                    <Popover
                      open={openPopoverId === post._id}
                      onOpenChange={(open) =>
                        setOpenPopoverId(open ? post._id : null)
                      }
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-lg p-2 hover:bg-gray-100"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent
                        align="end"
                        className="w-48 overflow-hidden rounded-xl border border-gray-200 bg-background-light shadow-lg p-0"
                      >
                        <div className="flex flex-col">
                          {post.status !== "published" && (
                            <button
                              onClick={() => {
                                handlePostPublish(post._id)
                                setOpenPopoverId(null)
                              }}
                              className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-gray-50"
                            >
                              <Plus className="h-4 w-4" />
                              Publish
                            </button>
                          )}
                          {console.log("Review open", reviewOpen)}
                          <button
                            onClick={() =>
                              setReviewOpen(!reviewOpen)
                            }
                            className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-gray-50"
                          >
                            <Pen className="h-4 w-4" />
                            Give Suggestion
                          </button>
                          {post.isFeatured === false && (

                            <button
                              onClick={() => {
                                handleFeaturedPost(post._id)
                                setOpenPopoverId(null)
                              }}
                              className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-gray-50"
                            >
                              <Star className="h-4 w-4" fill="black" />
                              Feature Post
                            </button>
                          )}
                          {post.isFeatured === true && (
                            <button
                              onClick={() => {
                                handleUnFeaturePost(post._id)
                                setOpenPopoverId(null)
                              }}
                              className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-gray-50"
                            >
                              <Star className="h-4 w-4" />
                              Unfeature Post
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setDeleteTarget({ type: "post", id: post._id })
                              setShowConfirm(true)
                              setOpenPopoverId(null)
                            }
                            }
                            className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm hover:bg-red-500/10 hover:text-red-500"
                          >
                            <Trash className="h-4 w-4" />
                            Remove
                          </button>

                          <button
                            onClick={() =>
                              navigate(`/blog/${post._id}`)
                            }
                            className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-gray-50"
                          >
                            <Eye className="h-4 w-4" />
                            Preview
                          </button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          navigate(`/author/edit-post/${post._id}`)
                        }}
                        className="rounded-full hover:bg-primary/10 hover:text-primary"
                      >
                        <Pen className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setDeleteTarget({ type: "post", id: post._id })
                          setShowConfirm(true)
                          setOpenPopoverId(null)
                        }}
                        className="rounded-full hover:bg-red-100"
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}