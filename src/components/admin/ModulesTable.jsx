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

export function ModulesTable() {
  const [modules, setModules] = useState([
    {
      id: "1",
      module_id: "module-1",
      title: "React Basics",
      course_id: "1",
    },
    {
      id: "2",
      module_id: "module-2",
      title: "React Hooks",
      course_id: "1",
    },
  ]);

  const courses = [
    {
      id: "1",
      course_id: "course-1",
      title: "Introduction to React",
    },
    {
      id: "2",
      course_id: "course-2",
      title: "Advanced JavaScript",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [editingModule, setEditingModule] = useState(null);

  const form = useForm({
    defaultValues: {
      module_id: "",
      title: "",
      course_id: "",
    },
  });

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this module?")) {
      setModules(modules.filter((module) => module.id !== id));
      toast.success("Module deleted successfully");
    }
  };

  const handleEdit = (module) => {
    setEditingModule(module);
    form.reset({
      module_id: module.module_id,
      title: module.title,
      course_id: module.course_id,
    });
    setIsOpen(true);
  };

  const onSubmit = (data) => {
    if (editingModule) {
      setModules(
        modules.map((m) => (m.id === editingModule.id ? { ...m, ...data } : m))
      );
      toast.success("Module updated successfully");
    } else {
      const newModule = {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
      };
      setModules([...modules, newModule]);
      toast.success("Module created successfully");
    }
    setIsOpen(false);
    form.reset();
    setEditingModule(null);
  };

  const openCreateDialog = () => {
    form.reset({
      module_id: "",
      title: "",
      course_id: "",
    });
    setEditingModule(null);
    setIsOpen(true);
  };

  const getCourseTitle = (courseId) => {
    const course = courses.find((c) => c.id === courseId);
    return course ? course.title : "Unknown Course";
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium">Modules</h3>
        <Button onClick={openCreateDialog} className="flex items-center gap-2">
          <Plus size={16} />
          Add Module
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingModule ? "Edit Module" : "Add New Module"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="module_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Module ID</FormLabel>
                    <FormControl>
                      <Input placeholder="module-1" {...field} />
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
                      <Input placeholder="React Basics" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="course_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.title}
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
                  {editingModule ? "Update" : "Create"}
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
              <TableHead>Module ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Course</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {modules.map((module) => (
              <TableRow key={module.id}>
                <TableCell>{module.module_id}</TableCell>
                <TableCell>{module.title}</TableCell>
                <TableCell>{getCourseTitle(module.course_id)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(module)}
                    >
                      <Pencil size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(module.id)}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {modules.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-6 text-muted-foreground"
                >
                  No modules found. Add one to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
