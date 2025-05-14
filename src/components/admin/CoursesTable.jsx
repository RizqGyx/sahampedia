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
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Plus, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";

const API_URL = "http://127.0.0.1:5000/api/v1/courses";

export function CoursesTable() {
  const [courses, setCourses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const form = useForm({
    defaultValues: {
      course_id: "",
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(API_URL);
      setCourses(res.data.courses);
    } catch (err) {
      toast.error("Failed to load courses");
    }
  };

  const handleDelete = async (course_id) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      await axios.delete(`${API_URL}/${course_id}`);
      setCourses((prev) => prev.filter((c) => c.course_id !== course_id));
      toast.success("Course deleted");
    } catch {
      toast.error("Failed to delete course");
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    form.reset(course);
    setIsOpen(true);
  };

  const onSubmit = async (data) => {
    try {
      if (editingCourse) {
        await axios.put(`${API_URL}/${editingCourse.course_id}`, data);
        setCourses((prev) =>
          prev.map((c) =>
            c.course_id === editingCourse.course_id ? { ...c, ...data } : c
          )
        );
        toast.success("Course updated");
      } else {
        const res = await axios.post(API_URL, data);
        setCourses((prev) => [...prev, res.data.course]);
        toast.success("Course created");
      }
      setIsOpen(false);
      form.reset();
      setEditingCourse(null);
    } catch {
      toast.error("Failed to save course");
    }
  };

  const openCreateDialog = () => {
    form.reset({ course_id: "", title: "", description: "" });
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
                      <Input placeholder="course-1" {...field} />
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
                      onClick={() => handleDelete(course.course_id)}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </TableCell>
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
