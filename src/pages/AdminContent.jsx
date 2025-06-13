import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Plus,
  Edit,
  Trash,
  ChevronLeft,
  ChevronRight,
  FileText,
} from "lucide-react";
import axios from "axios";
import ConfirmDeleteDialog from "@/components/admin/ConfirmDeleteDialog";

const API_URL = "http://localhost:5000/api/v1/contents";

const contentTypes = [
  "text",
  "image",
  "video",
  "subtitle",
  "note",
  "list",
  "conclusion",
];

const AdminContent = () => {
  const [contents, setContents] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingContent, setEditingContent] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedContentId, setSelectedContentId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const form = useForm({
    defaultValues: {
      content_id: "",
      type: "",
      value: "",
      title: "",
      src: "",
      alt: "",
      caption: "",
      youtubeId: "",
      list: "",
      lesson_id: "",
    },
  });

  const fetchContents = async () => {
    try {
      const response = await axios.get(API_URL);
      setContents(response.data.contents);
    } catch (error) {
      toast.error("Failed to fetch contents");
    }
  };

  const fetchLessons = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/lessons");
      setLessons(res.data.lessons);
    } catch {
      toast.error("Failed to fetch lessons");
    }
  };

  useEffect(() => {
    fetchContents();
    fetchLessons();
  }, []);

  const handleDelete = async () => {
    if (!selectedContentId) return;
    setIsDeleting(true);
    try {
      await axios.delete(`${API_URL}/${selectedContentId}`, {
        withCredentials: true,
      });
      toast.success("Content deleted successfully");
      fetchContents();
    } catch (error) {
      toast.error("Failed to delete content");
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setSelectedContentId(null);
    }
  };

  const handleEdit = (content) => {
    setEditingContent(content);
    form.reset({
      content_id: content.content_id || "",
      type: content.type || "",
      value: content.value || "",
      title: content.title || "",
      src: content.src || "",
      alt: content.alt || "",
      caption: content.caption || "",
      youtubeId: content.youtubeId || "",
      list: content.list || "",
      lesson_id: content.lesson_id || "",
    });
    setIsOpen(true);
  };

  const onSubmit = async (data) => {
    if (
      !data.lesson_id.trim() ||
      !data.type.trim() ||
      !data.content_id.trim()
    ) {
      toast.error("Lesson ID, Content ID, and Type are required");
      return;
    }

    try {
      if (editingContent) {
        const updatedContent = { ...editingContent, ...data };
        await axios.put(
          `${API_URL}/${editingContent.content_id}`,
          updatedContent,
          { withCredentials: true }
        );
        toast.success("Content updated successfully");
      } else {
        await axios.post(API_URL, data, { withCredentials: true });
        toast.success("Content created successfully");
      }
      fetchContents();
      form.reset();
      setIsOpen(false);
      setEditingContent(null);
    } catch (error) {
      toast.error(error.response.data.error || "Failed to save content");
    }
  };

  const openCreateDialog = () => {
    form.reset({
      content_id: "",
      type: "",
      value: "",
      title: "",
      src: "",
      alt: "",
      caption: "",
      youtubeId: "",
      list: "",
      lesson_id: "",
    });
    setEditingContent(null);
    setIsOpen(true);
  };

  // Filter data based on search query
  const filteredData = contents.filter(
    (item) =>
      (item.content_id?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      ) ||
      (item.type?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (item.value?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (item.title?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (item.src?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (item.alt?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (item.caption?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (item.youtubeId?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      ) ||
      (item.list?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (item.lesson_id?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [filteredData.length, currentPage, totalPages]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getLessonTitle = (lessonId) => {
    const lesson = lessons.find((m) => m.lesson_id === lessonId);
    return lesson ? lesson.title + ` [${lesson.lesson_id}]` : "Unknown Lesson";
  };

  const watchType = form.watch("type");

  const buildPayload = (data) => {
    const base = {
      content_id: data.content_id,
      type: data.type,
      lesson_id: data.lesson_id,
    };

    switch (data.type) {
      case "image":
        return { ...base, src: data.src, alt: data.alt, caption: data.caption };
      case "video":
        return { ...base, youtubeId: data.youtubeId, title: data.title };
      case "list":
        return { ...base, value: data.value, list: data.list };
      default:
        return { ...base, value: data.value };
    }
  };

  const filterFieldsByType = (data) => {
    const base = {
      content_id: data.content_id || "",
      type: data.type || "",
      lesson_id: data.lesson_id || "",
    };

    switch (data.type) {
      case "image":
        return {
          ...base,
          src: data.src || "",
          alt: data.alt || "",
          caption: data.caption || "",
        };
      case "video":
        return {
          ...base,
          youtubeId: data.youtubeId || "",
          title: data.title || "",
        };
      case "list":
        return {
          ...base,
          value: data.value || "",
          list: data.list || "",
        };
      default:
        return {
          ...base,
          value: data.value || "",
        };
    }
  };

  const InputField = ({ name, label }) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const TextareaField = ({ name, label }) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const renderFieldsByType = () => {
    switch (watchType) {
      case "image":
        return (
          <>
            <InputField name="src" label="Image Source" />
            <InputField name="alt" label="Alt Text" />
            <InputField name="caption" label="Caption" />
          </>
        );
      case "video":
        return (
          <>
            <InputField name="youtubeId" label="YouTube ID" />
            <InputField name="title" label="Video Title" />
          </>
        );
      case "list":
        return (
          <>
            <TextareaField
              name="value"
              label="List Content (newline separated)"
            />

            <FormField
              control={form.control}
              name="list"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>List Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select list type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ul">Unordered (ul)</SelectItem>
                      <SelectItem value="ol">Ordered (ol)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      default:
        return <TextareaField name="value" label="Content Value" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Contents</h1>
            <p className="text-muted-foreground">
              Manage your educational contents
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Input
                placeholder="Search contents..."
                className="w-full sm:w-[260px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              onClick={openCreateDialog}
              className="cursor-pointer hover:bg-zinc-400"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Content
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentItems.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden hover:shadow-lg transition-shadow rounded-2xl border border-border"
            >
              {/* Indicator Bar */}
              <div className="h-1.5 bg-primary" />

              {/* Header */}
              <CardHeader className="pb-3 pt-4 px-5">
                <div className="flex justify-between items-start">
                  <div className="space-y-0.5">
                    <CardTitle className="text-base font-semibold capitalize">
                      {item.type}
                    </CardTitle>
                    <CardDescription className="text-xs text-muted-foreground">
                      Content ID: {item.content_id}
                    </CardDescription>
                  </div>
                  <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                </div>
              </CardHeader>

              {/* Content Preview */}
              <CardContent className="px-5 pb-4 space-y-2 text-sm text-muted-foreground">
                {item.type === "text" && (
                  <>
                    <p className="line-clamp-3">{item.value}</p>
                  </>
                )}
                {item.type === "subtitle" && (
                  <p className="italic font-medium text-foreground">
                    {item.value}
                  </p>
                )}
                {item.type === "note" && (
                  <p className="bg-yellow-100 text-yellow-800 p-2 rounded text-xs">
                    Note: {item.value}
                  </p>
                )}
                {item.type === "list" && (
                  <>
                    <p className="italic font-medium text-foreground">
                      Type:{" "}
                      {!item.list || item.list === "ul"
                        ? "unordered (ul)"
                        : "ordered (ol)"}
                    </p>
                    {item.list === "ol" ? (
                      <ol className="list-decimal list-inside text-sm">
                        {item.value?.split("\n").map((line, idx) => (
                          <li key={idx}>{line}</li>
                        ))}
                      </ol>
                    ) : (
                      <ul className="list-disc list-inside text-sm">
                        {item.value?.split("\n").map((line, idx) => (
                          <li key={idx}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
                {item.type === "image" && (
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      <span className="font-medium text-foreground">alt:</span>{" "}
                      {item.alt}
                    </p>
                    <img
                      src={`/${item.src}`}
                      alt={item.alt}
                      className="rounded-lg max-h-40 object-cover"
                    />
                    <p className="text-xs text-muted-foreground">
                      {item.caption}
                    </p>
                  </div>
                )}
                {item.type === "video" && (
                  <div className="space-y-1">
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <iframe
                        src={`https://www.youtube.com/embed/${item.youtubeId}`}
                        title={item.title}
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                    <p className="text-xs text-center text-muted-foreground">
                      {item.title}
                    </p>
                  </div>
                )}
                {item.type === "conclusion" && (
                  <p className="border-l-4 border-primary pl-3 font-medium">
                    {item.value}
                  </p>
                )}
                <p className="text-sm text-muted-foreground line-clamp-3">
                  <span className="font-medium text-foreground">
                    Asal Lesson:
                  </span>{" "}
                  {getLessonTitle(item.lesson_id)}
                </p>
              </CardContent>

              {/* Footer Buttons */}
              <CardFooter className="flex justify-end px-5 pb-4">
                <div className="flex space-x-2">
                  <Button
                    variant="edit"
                    size="sm"
                    className="cursor-pointer"
                    onClick={() => handleEdit(item)}
                  >
                    <Edit className="h-4 w-4 mr-1.5" />
                    Edit
                  </Button>
                  <Button
                    variant="delete"
                    size="sm"
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedContentId(item.content_id);
                      setDeleteDialogOpen(true);
                    }}
                  >
                    <Trash className="h-4 w-4 mr-1.5" />
                    Delete
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <ConfirmDeleteDialog
          key={selectedContentId}
          open={deleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          onConfirm={() => handleDelete(selectedContentId)}
          title="Delete Content"
          description={`Data Content with ID: ${selectedContentId} will be permanently deleted. Are you sure you want to proceed?`}
          loading={isDeleting}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-4">
            {/* Tombol kiri */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Halaman pertama */}
            <Button
              variant={currentPage === 1 ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(1)}
            >
              1
            </Button>

            {/* Halaman sebelumnya (jika valid dan bukan halaman 1) */}
            {currentPage - 1 > 1 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                {currentPage - 1}
              </Button>
            )}

            {/* Halaman saat ini (jika bukan halaman 1 atau terakhir) */}
            {currentPage !== 1 && currentPage !== totalPages && (
              <Button variant="default" size="sm">
                {currentPage}
              </Button>
            )}

            {/* Halaman sesudah (jika valid dan bukan halaman terakhir) */}
            {currentPage + 1 < totalPages && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                {currentPage + 1}
              </Button>
            )}

            {/* Halaman terakhir */}
            {totalPages !== 1 && (
              <Button
                variant={currentPage === totalPages ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(totalPages)}
              >
                {totalPages}
              </Button>
            )}

            {/* Tombol kanan */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingContent ? "Edit" : "Add"} Content
              </DialogTitle>
              <DialogDescription>
                {editingContent
                  ? "Edit the details of the selected content."
                  : "Fill the form to add a new content."}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="content_id"
                    rules={{
                      required: "ID is required",
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content ID</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="course-1"
                            {...field}
                            disabled={!!editingContent}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {contentTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {renderFieldsByType()}

                <FormField
                  control={form.control}
                  name="lesson_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lesson</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="truncate max-w-[25rem]">
                            <SelectValue
                              placeholder="Select lesson"
                              className="truncate"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {lessons.map((lesson) => (
                            <SelectItem
                              key={lesson.lesson_id}
                              value={lesson.lesson_id}
                            >
                              {lesson.title} ({lesson.lesson_id})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      form.reset(emptyContent);
                      setEditingContent(null);
                      setIsOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="cursor-pointer">
                    {editingContent ? "Update" : "Create"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default AdminContent;
