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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  LayoutGrid,
  LayoutList,
} from "lucide-react";
import axios from "axios";
import ConfirmDeleteDialog from "@/components/admin/ConfirmDeleteDialog";

const API_URL = "http://localhost:5000/api/v1/courses";

const AdminCourse = () => {
  const [courses, setCourses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

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

  // Filter data based on search query
  const filteredData = courses.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.course_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Courses</h1>
            <p className="text-muted-foreground">
              Manage your educational courses
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Input
                placeholder="Search courses..."
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
              Add Course
            </Button>
          </div>
        </div>

        <div className="flex justify-end mb-4">
          <div className="bg-muted/40 p-1 rounded-md flex space-x-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-8 w-8 p-0 cursor-pointer"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="h-8 w-8 p-0 cursor-pointer"
            >
              <LayoutList className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentItems.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-lg transition-shadow rounded-2xl border border-border"
              >
                {/* Top indicator */}
                <div className="h-1.5 bg-primary" />

                {/* Header */}
                <CardHeader className="pb-3 pt-4 px-5">
                  <div className="flex justify-between items-start">
                    <div className="space-y-0.5">
                      <CardTitle className="text-base font-semibold">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-xs text-muted-foreground">
                        Course ID: {item.course_id}
                      </CardDescription>
                    </div>
                    <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                  </div>
                </CardHeader>

                {/* Content */}
                <CardContent className="px-5 pb-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {item.description}
                  </p>
                </CardContent>

                {/* Footer */}
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
                        setSelectedCourseId(item.course_id);
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
        ) : (
          <div className="rounded-md border">
            <table className="min-w-full divide-y divide-border">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3.5 text-left text-sm font-semibold">
                    ID
                  </th>
                  <th className="px-4 py-3.5 text-left text-sm font-semibold">
                    Title
                  </th>
                  <th className="hidden md:table-cell px-4 py-3.5 text-left text-sm font-semibold">
                    Description
                  </th>
                  <th className="px-4 py-3.5 text-right text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {currentItems.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/30">
                    <td className="px-4 py-4 text-sm font-medium">
                      {item.course_id}
                    </td>
                    <td className="px-4 py-4 text-sm">{item.title}</td>
                    <td className="hidden md:table-cell px-4 py-4 text-sm text-muted-foreground">
                      <div className="line-clamp-2">{item.description}</div>
                    </td>
                    <td className="px-4 py-4 text-sm text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="edit"
                          size="sm"
                          onClick={() => handleEdit(item)}
                          className="cursor-pointer"
                        >
                          <Edit className="h-3.5 w-3.5 mr-1.5" />
                          Edit
                        </Button>
                        <Button
                          variant="delete"
                          size="sm"
                          className="cursor-pointer"
                          onClick={() => {
                            setSelectedCourseId(item.course_id);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash className="h-3.5 w-3.5 mr-1.5" />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <ConfirmDeleteDialog
          key={selectedCourseId}
          open={deleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          onConfirm={() => handleDelete(selectedCourseId)}
          title="Delete Course"
          description={`Data Course with ID: ${selectedCourseId} will be permanently deleted. Are you sure you want to proceed?`}
          loading={isDeleting}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className="cursor-pointer"
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCourse ? "Edit Course" : "Add New Course"}
              </DialogTitle>
              <DialogDescription>
                {editingCourse
                  ? "Edit the details of the selected course."
                  : "Fill the form to add a new course."}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="course_id"
                  rules={{
                    required: "ID is required",
                  }}
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
                  rules={{
                    required: "Title is required",
                  }}
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
                  rules={{
                    required: "Description is required",
                  }}
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
                  <Button type="submit" className="cursor-pointer">
                    {editingCourse ? "Update" : "Create"}
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

export default AdminCourse;
