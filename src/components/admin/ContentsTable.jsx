import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Plus, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/v1/contents";

const contentTypes = [
  "text",
  "image",
  "video",
  "subtitle",
  "note",
  "list",
  "conclusion",
];

export function ContentsTable() {
  const [contents, setContents] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingContent, setEditingContent] = useState(null);

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

  const emptyContent = {
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
  };

  const watchType = form.watch("type");

  useEffect(() => {
    fetchContents();
    fetchLessons();
  }, []);

  const fetchContents = async () => {
    try {
      const res = await axios.get(API_URL);
      setContents(res.data.contents);
    } catch {
      toast.error("Failed to fetch contents");
    }
  };

  const fetchLessons = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/api/v1/lessons");
      setLessons(res.data.lessons);
    } catch {
      toast.error("Failed to fetch lessons");
    }
  };

  const handleDelete = async (content_id) => {
    if (!confirm("Delete this content?")) return;
    try {
      await axios.delete(`${API_URL}/${content_id}`);
      setContents((prev) => prev.filter((c) => c.content_id !== content_id));
      toast.success("Content deleted");
    } catch {
      toast.error("Failed to delete content");
    }
  };

  const handleEdit = (content) => {
    setEditingContent(content);
    const cleaned = filterFieldsByType(content); // Bersihkan field sesuai type
    form.reset(cleaned);
    setIsOpen(true);
  };

  const onSubmit = async (data) => {
    const payload = buildPayload(data);
    try {
      if (editingContent) {
        const res = await axios.put(
          `${API_URL}/${editingContent.content_id}`,
          payload
        );
        setContents((prev) =>
          prev.map((c) =>
            c.content_id === editingContent.content_id
              ? { ...c, ...payload }
              : c
          )
        );
        toast.success("Content updated");
      } else {
        const res = await axios.post(API_URL, payload);
        setContents((prev) => [...prev, res.data.content]);
        toast.success("Content created");
      }
      form.reset(emptyContent);
      setIsOpen(false);
      setEditingContent(null);
    } catch (err) {
      toast.error("Failed to save content");
    }
  };

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
            <TextareaField name="value" label="List Description" />
            <TextareaField
              name="list"
              label="List Content (newline separated)"
            />
          </>
        );
      default:
        return <TextareaField name="value" label="Content Value" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold">Contents</h3>
        <Button
          onClick={() => {
            form.reset(emptyContent);
            setEditingContent(null);
            setIsOpen(true);
          }}
        >
          <Plus size={16} className="mr-1" /> Add Content
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingContent ? "Edit" : "Add"} Content</DialogTitle>
            <DialogDescription>
              {editingContent
                ? "Ubah data konten yang ada."
                : "Tambah konten baru."}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <InputField name="content_id" label="Content ID" />
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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select lesson" />
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
                <Button type="submit">
                  {editingContent ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Content ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Lesson</TableHead>
              <TableHead>Value</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contents.length > 0 ? (
              contents.map((item) => (
                <TableRow key={item.content_id}>
                  <TableCell>{item.content_id}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>
                    {lessons.find((l) => l.lesson_id === item.lesson_id)
                      ? `${
                          lessons.find((l) => l.lesson_id === item.lesson_id)
                            .title
                        } [${
                          lessons.find((l) => l.lesson_id === item.lesson_id)
                            .lesson_id
                        }]`
                      : "Unknown"}
                  </TableCell>
                  <TableCell className="truncate max-w-xs">
                    {item.value ||
                      item.title ||
                      item.alt ||
                      item.caption ||
                      item.youtubeId}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(item)}
                    >
                      <Pencil size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(item.content_id)}
                    >
                      <Trash size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-6 text-muted-foreground"
                >
                  No content found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
