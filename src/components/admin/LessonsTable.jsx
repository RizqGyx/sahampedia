import { useEffect, useState } from "react";
import axios from "axios";
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
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

const API_URL = "http://127.0.0.1:5000/api/v1/lessons";

export function LessonsTable() {
  const [lessons, setLessons] = useState([]);
  const [modules, setModules] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const form = useForm({
    defaultValues: {
      lesson_id: "",
      title: "",
      module_id: "",
    },
  });

  // Fetch all lessons
  const fetchLessons = async () => {
    try {
      const response = await axios.get(API_URL);
      setLessons(response.data.lessons);
    } catch (error) {
      toast.error("Failed to fetch lessons");
      console.error(error);
    }
  };

  const fetchModules = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/api/v1/modules");
      setModules(res.data.modules);
    } catch {
      toast.error("Failed to fetch modules");
    }
  };

  useEffect(() => {
    fetchLessons();
    fetchModules();
  }, []);

  const handleDelete = async () => {
    if (!selectedLessonId) return;
    setIsDeleting(true);
    try {
      await axios.delete(`${API_URL}/${selectedLessonId}`);
      toast.success("Lesson deleted successfully");
      fetchLessons();
    } catch (error) {
      toast.error("Failed to delete lesson");
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setSelectedLessonId(null);
    }
  };

  const handleEdit = (lesson) => {
    setEditingLesson(lesson);
    form.reset({
      lesson_id: lesson.lesson_id,
      title: lesson.title,
      module_id: lesson.module_id,
    });
    setIsOpen(true);
  };

  const onSubmit = async (data) => {
    if (
      !data.lesson_id.trim() ||
      !data.title.trim() ||
      !data.module_id.trim()
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      if (editingLesson) {
        const updatedLesson = { ...editingLesson, ...data };
        await axios.put(`${API_URL}/${editingLesson.lesson_id}`, updatedLesson);
        toast.success("Lesson updated successfully");
      } else {
        await axios.post(API_URL, data);
        toast.success("Lesson created successfully");
      }

      fetchLessons(); // Refresh list
      form.reset();
      setIsOpen(false);
      setEditingLesson(null);
    } catch (error) {
      toast.error("Failed to save lesson");
      console.error(error);
    }
  };

  const openCreateDialog = () => {
    form.reset({
      lesson_id: "",
      title: "",
      module_id: "",
    });
    setEditingLesson(null);
    setIsOpen(true);
  };

  const getModuleTitle = (moduleId) => {
    const module = modules.find((m) => m.module_id === moduleId);
    return module ? module.title + ` [${module.module_id}]` : "Unknown Module";
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium">Lessons</h3>
        <Button onClick={openCreateDialog} className="flex items-center gap-2">
          <Plus size={16} />
          Add Lesson
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingLesson ? "Edit Lesson" : "Add New Lesson"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="lesson_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lesson ID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="lesson-1"
                        {...field}
                        disabled={!!editingLesson}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Understanding JSX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="module_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Module</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a module" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {modules.map((module) => (
                          <SelectItem
                            key={module.module_id}
                            value={module.module_id}
                          >
                            {module.title}
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
                    setIsOpen(false);
                    form.reset();
                    setEditingLesson(null);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingLesson ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lesson ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Module</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lessons && lessons.length > 0 ? (
              lessons.map((lesson) => (
                <TableRow key={lesson.lesson_id}>
                  <TableCell>{lesson.lesson_id}</TableCell>
                  <TableCell>{lesson.title}</TableCell>
                  <TableCell>{getModuleTitle(lesson.module_id)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(lesson)}
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedLessonId(lesson.lesson_id);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </TableCell>
                  <ConfirmDeleteDialog
                    key={lesson.lesson_id}
                    open={deleteDialogOpen}
                    setOpen={setDeleteDialogOpen}
                    onConfirm={() => handleDelete(selectedLessonId)}
                    title="Hapus Lesson"
                    description={`Data Lesson dengan ID: ${selectedLessonId} akan dihapus secara permanen. Anda yakin ingin melanjutkan?`}
                    loading={isDeleting}
                  />
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-6 text-muted-foreground"
                >
                  No lessons found. Add one to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
