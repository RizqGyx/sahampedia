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
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Plus, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

const API_URL = "http://localhost:5000/api/v1/courses";

export function CoursesTable() {
  const [courses, setCourses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const form = useForm({
    defaultValues: {
      course_id: "",
      title: "",
      description: "",
    },
  });

  const fetchCourses = async () => {
    try {
      const res = await axios.get(API_URL, { withCredentials: true });
      setCourses(res.data.courses);
    } catch (err) {
      toast.error("Failed to load courses");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async () => {
    if (!selectedCourseId) return;
    setIsDeleting(true);
    try {
      await axios.delete(`${API_URL}/${selectedCourseId}`, {
        withCredentials: true,
      });
      toast.success("Course deleted successfully");
      fetchCourses();
    } catch (error) {
      toast.error("Failed to delete module");
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setSelectedCourseId(null);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    form.reset({
      course_id: course.course_id,
      title: course.title,
      description: course.description,
    });
    setIsOpen(true);
  };

  const onSubmit = async (data) => {
    if (
      !data.course_id.trim() ||
      !data.title.trim() ||
      !data.description.trim()
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      if (editingCourse) {
        const updatedCourse = { ...editingCourse, ...data };
        await axios.put(
          `${API_URL}/${editingCourse.course_id}`,
          updatedCourse,
          { withCredentials: true }
        );
        toast.success("Course updated successfully");
      } else {
        await axios.post(API_URL, data, { withCredentials: true });
        toast.success("Course created successfully");
      }
      fetchCourses();
      form.reset();
      setIsOpen(false);
      setEditingCourse(null);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to save course");
    }
  };

  const openCreateDialog = () => {
    form.reset({
      course_id: "",
      title: "",
      description: "",
    });
    setEditingCourse(null);
    setIsOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium">Courses</h3>
        <Button onClick={openCreateDialog} className="flex items-center gap-2">
          <Plus size={16} />
          Add Course
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCourse ? "Edit Course" : "Add New Course"}
            </DialogTitle>
            <DialogDescription id="dialog-description">
              {editingCourse
                ? "Edit the details of the selected course."
                : "Fill the form to add a new course."}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="course_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course ID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="course-1"
                        {...field}
                        disabled={!!editingCourse}
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
                      <Input placeholder="Course Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description" {...field} />
                    </FormControl>
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
                  {editingCourse ? "Update" : "Create"}
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
              <TableHead>Course ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.course_id}>
                <TableCell>{course.course_id}</TableCell>
                <TableCell>{course.title}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {course.description}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(course)}
                    >
                      <Pencil size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedCourseId(course.course_id);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </TableCell>
                <ConfirmDeleteDialog
                  key={selectedCourseId}
                  open={deleteDialogOpen}
                  setOpen={setDeleteDialogOpen}
                  onConfirm={() => handleDelete(selectedCourseId)}
                  title="Hapus Kursus"
                  description={`Data Kursus dengan ID: ${selectedCourseId} akan dihapus secara permanen. Anda yakin ingin melanjutkan?`}
                  loading={isDeleting}
                />
              </TableRow>
            ))}
            {courses.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-6 text-muted-foreground"
                >
                  No courses found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
