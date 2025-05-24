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

const API_URL = "http://localhost:5000/api/v1/modules";

export function ModulesTable() {
  const [modules, setModules] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingModule, setEditingModule] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const form = useForm({
    defaultValues: {
      module_id: "",
      title: "",
      course_id: "",
    },
  });

  const fetchModules = async () => {
    try {
      const response = await axios.get(API_URL, { withCredentials: true });
      setModules(response.data.modules);
    } catch (error) {
      toast.error("Failed to fetch modules");
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/courses", {
        withCredentials: true,
      });
      setCourses(res.data.courses);
    } catch {
      toast.error("Failed to fetch courses");
    }
  };

  useEffect(() => {
    fetchModules();
    fetchCourses();
  }, []);

  const handleDelete = async () => {
    if (!selectedModuleId) return;
    setIsDeleting(true);
    try {
      await axios.delete(`${API_URL}/${selectedModuleId}`, {
        withCredentials: true,
      });
      toast.success("Module deleted successfully");
      fetchModules();
    } catch (error) {
      toast.error("Failed to delete module");
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setSelectedModuleId(null);
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

  const onSubmit = async (data) => {
    if (
      !data.module_id.trim() ||
      !data.title.trim() ||
      !data.course_id.trim()
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      if (editingModule) {
        const updatedModule = { ...editingModule, ...data };
        await axios.put(
          `${API_URL}/${editingModule.module_id}`,
          updatedModule,
          { withCredentials: true }
        );
        toast.success("Module updated successfully");
      } else {
        await axios.post(API_URL, data, { withCredentials: true });
        toast.success("Module created successfully");
      }
      fetchModules();
      form.reset();
      setIsOpen(false);
      setEditingModule(null);
    } catch (error) {
      toast.error(error.response.data.error || "Failed to save module");
    }
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
    const course = courses.find((c) => c.course_id === courseId);
    return course ? course.title + ` [${course.course_id}]` : "Unknown Course";
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
                      <Input
                        placeholder="module-1"
                        {...field}
                        disabled={!!editingModule}
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
                          <SelectItem
                            key={course.course_id}
                            value={course.course_id}
                          >
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
            {modules && modules.length > 0 ? (
              modules.map((module) => (
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
                        onClick={() => {
                          setSelectedModuleId(module.module_id);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </TableCell>
                  <ConfirmDeleteDialog
                    key={module.module_id}
                    open={deleteDialogOpen}
                    setOpen={setDeleteDialogOpen}
                    onConfirm={() => handleDelete(module.module_id)}
                    title="Hapus Modul"
                    description={`Data Modul dengan ID: ${module.module_id} akan dihapus secara permanen. Anda yakin ingin melanjutkan?`}
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
