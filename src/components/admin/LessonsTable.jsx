import { useState } from "react";
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

export function LessonsTable() {
  const [lessons, setLessons] = useState([
    {
      id: "1",
      lesson_id: "lesson-1",
      title: "Understanding JSX",
      module_id: "1",
    },
    {
      id: "2",
      lesson_id: "lesson-2",
      title: "Component Props",
      module_id: "1",
    },
  ]);

  const modules = [
    {
      id: "1",
      module_id: "module-1",
      title: "React Basics",
    },
    {
      id: "2",
      module_id: "module-2",
      title: "React Hooks",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);

  const form = useForm({
    defaultValues: {
      lesson_id: "",
      title: "",
      module_id: "",
    },
  });

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this lesson?")) {
      setLessons(lessons.filter((lesson) => lesson.id !== id));
      toast.success("Lesson deleted successfully");
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

  const onSubmit = (data) => {
    if (editingLesson) {
      setLessons(
        lessons.map((l) => (l.id === editingLesson.id ? { ...l, ...data } : l))
      );
      toast.success("Lesson updated successfully");
    } else {
      const newLesson = {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
      };
      setLessons([...lessons, newLesson]);
      toast.success("Lesson created successfully");
    }
    setIsOpen(false);
    form.reset();
    setEditingLesson(null);
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
    const module = modules.find((m) => m.id === moduleId);
    return module ? module.title : "Unknown Module";
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
                      <Input placeholder="lesson-1" {...field} />
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
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a module" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {modules.map((module) => (
                          <SelectItem key={module.id} value={module.id}>
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
                  onClick={() => setIsOpen(false)}
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
            {lessons.map((lesson) => (
              <TableRow key={lesson.id}>
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
                      onClick={() => handleDelete(lesson.id)}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {lessons.length === 0 && (
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
