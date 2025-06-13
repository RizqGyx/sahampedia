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
  LayoutGrid,
  LayoutList,
} from "lucide-react";
import axios from "axios";
import ConfirmDeleteDialog from "@/components/admin/ConfirmDeleteDialog";

const API_URL = "http://localhost:5000/api/v1/modules";

const AdminModule = () => {
  const [modules, setModules] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingModule, setEditingModule] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

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
      toast.error("All fields are required, please recheck the form");
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

  // Filter data based on search query
  const filteredData = modules.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.module_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

  const getCourseTitle = (courseId) => {
    const course = courses.find((c) => c.course_id === courseId);
    return course ? course.title + ` [${course.course_id}]` : "Unknown Course";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Modules</h1>
            <p className="text-muted-foreground">
              Manage your educational modules
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Input
                placeholder="Search modules..."
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
              Add Module
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
                {/* Top border indicator */}
                <div className="h-1.5 bg-primary" />

                {/* Header */}
                <CardHeader className="pb-3 pt-4 px-5">
                  <div className="flex justify-between items-start">
                    <div className="space-y-0.5">
                      <CardTitle className="text-base font-semibold">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-xs text-muted-foreground">
                        Module ID: {item.module_id}
                      </CardDescription>
                    </div>
                    <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                  </div>
                </CardHeader>

                {/* Content */}
                <CardContent className="px-5 pb-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    <span className="font-medium text-foreground">
                      Asal Course:
                    </span>{" "}
                    {getCourseTitle(item.course_id)}
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
                        setSelectedModuleId(item.module_id);
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
                    Module ID
                  </th>
                  <th className="px-4 py-3.5 text-left text-sm font-semibold">
                    Title
                  </th>
                  <th className="hidden md:table-cell px-4 py-3.5 text-left text-sm font-semibold">
                    Course
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
                      {item.module_id}
                    </td>
                    <td className="px-4 py-4 text-sm">{item.title}</td>
                    <td className="hidden md:table-cell px-4 py-4 text-sm text-muted-foreground">
                      <div className="line-clamp-2">
                        {getCourseTitle(item.course_id)}
                      </div>
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
                            setSelectedModuleId(item.module_id);
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
          key={selectedModuleId}
          open={deleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          onConfirm={() => handleDelete(selectedModuleId)}
          title="Delete Module"
          description={`Data Module with ID: ${selectedModuleId} will be permanently deleted. Are you sure you want to proceed?`}
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
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingModule ? "Edit Module" : "Add New Module"}
              </DialogTitle>
              <DialogDescription>
                {editingModule
                  ? "Edit the details of the selected module."
                  : "Fill the form to add a new module."}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="module_id"
                  rules={{
                    required: "ID is required",
                  }}
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
                  rules={{
                    required: "Title is required",
                  }}
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
                          <SelectTrigger className="truncate max-w-[25rem]">
                            <SelectValue
                              placeholder="Select a course"
                              className="truncate"
                            />
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
                  <Button type="submit" className="cursor-pointer">
                    {editingModule ? "Update" : "Create"}
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

export default AdminModule;
