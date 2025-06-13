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

const API_URL = "http://localhost:5000/api/v1/journals";

const AdminJournal = () => {
  const [journals, setJournals] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingJournal, setEditingJournal] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedJournalId, setSelectedJournalId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const form = useForm({
    defaultValues: {
      title: "",
      authors: "",
      journal: "",
      year: "",
      volume: "",
      url: "",
      description: "",
    },
  });

  const fetchJournals = async () => {
    try {
      const response = await axios.get(API_URL, { withCredentials: true });
      setJournals(response.data.journals);
    } catch (err) {
      toast.error("Failed to load journals");
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  const handleDelete = async () => {
    if (!selectedJournalId) return;
    setIsDeleting(true);
    try {
      await axios.delete(`${API_URL}/${selectedJournalId}`, {
        withCredentials: true,
      });
      toast.success("Journal deleted successfully");
      fetchJournals();
    } catch (err) {
      toast.error("Failed to delete journal");
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setSelectedJournalId(null);
    }
  };

  const handleEdit = (journal) => {
    setEditingJournal(journal);
    form.reset({
      title: journal.title,
      authors: journal.authors,
      journal: journal.journal,
      year: journal.year,
      volume: journal.volume,
      url: journal.url,
      description: journal.description,
    });
    setIsOpen(true);
  };

  const onSubmit = async (data) => {
    if (
      !data.title.trim() ||
      !data.authors.trim() ||
      !data.journal.trim() ||
      !data.year ||
      !data.description.trim()
    ) {
      toast.error("All fields are required, please recheck the form");
      return;
    }

    try {
      if (editingJournal) {
        const updatedJournal = { ...editingJournal, ...data };
        await axios.put(`${API_URL}/${editingJournal.id}`, updatedJournal, {
          withCredentials: true,
        });
        toast.success("Journal updated successfully");
      } else {
        await axios.post(API_URL, data, {
          withCredentials: true,
        });
        toast.success("Journal created successfully");
      }
      fetchJournals();
      form.reset();
      setIsOpen(false);
      setEditingJournal(null);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to save journal");
    }
  };

  const openCreateDialog = () => {
    form.reset({
      title: "",
      authors: "",
      journal: "",
      year: "",
      volume: "",
      url: "",
      description: "",
    });
    setEditingJournal(null);
    setIsOpen(true);
  };

  // Filter data based on search query
  const filteredData = journals.filter(
    (item) =>
      (item.title?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (item.authors?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (item.journal?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (item.year?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (item.volume?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (item.url?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (item.description?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      )
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
            <h1 className="text-2xl font-bold tracking-tight">Journals</h1>
            <p className="text-muted-foreground">
              Manage your educational journals
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Input
                placeholder="Search journals..."
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
              Add Journal
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
                className="overflow-hidden hover:shadow-md transition-shadow justify-between rounded-2xl border border-border"
              >
                <div className="h-1.5 bg-primary" />
                <CardHeader className="pb-2 pt-4 px-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-medium text-left">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-xs text-left mt-1">
                        {item.authors}
                      </CardDescription>
                    </div>
                    <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4 text-left">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {item.journal}
                    </span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                      {item.year}
                    </span>
                    {item.volume && (
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                        {item.volume}
                      </span>
                    )}
                  </div>
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline max-w-full block truncate mt-2"
                      title={item.url}
                    >
                      {" "}
                      {item.url}{" "}
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-2">
                      No URL provided
                    </p>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end">
                  <div className="space-x-2">
                    <Button
                      variant="edit"
                      size="sm"
                      className="cursor-pointer"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit className="h-3.5 w-3.5 mr-1.5" />
                      Edit
                    </Button>
                    <Button
                      variant="delete"
                      size="sm"
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedJournalId(item.id);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      <Trash className="h-3.5 w-3.5 mr-1.5" />
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
                    Journal ID
                  </th>
                  <th className="px-4 py-3.5 text-left text-sm font-semibold">
                    Title
                  </th>
                  <th className="px-4 py-3.5 text-left text-sm font-semibold">
                    Author
                  </th>
                  <th className="px-4 py-3.5 text-left text-sm font-semibold">
                    Journal
                  </th>
                  <th className="px-4 py-3.5 text-left text-sm font-semibold">
                    Year
                  </th>
                  <th className="px-4 py-3.5 text-right text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {currentItems.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/30">
                    <td className="px-4 py-4 text-sm font-medium">{item.id}</td>
                    <td className="px-4 py-4 text-sm">{item.title}</td>
                    <td className="px-4 py-4 text-sm">{item.authors}</td>
                    <td className="px-4 py-4 text-sm">{item.journal}</td>
                    <td className="px-4 py-4 text-sm">{item.year}</td>
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
                            setSelectedJournalId(item.id);
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
          key={selectedJournalId}
          open={deleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          onConfirm={() => handleDelete(selectedJournalId)}
          title="Delete Journal"
          description={`Data Journal with ID: ${selectedJournalId} will be permanently deleted. Are you sure you want to proceed?`}
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
              <DialogTitle className="text-center">
                {editingJournal ? "Edit" : "Add New"} Journal
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-center">
              {editingJournal
                ? "Edit the details of the selected journal."
                : "Fill the form to add a new journal."}
            </DialogDescription>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="title"
                  rules={{ required: "Title is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="authors"
                    rules={{ required: " Author is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Author</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="journal"
                    rules={{ required: "Journal is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Journal</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="year"
                    rules={{
                      required: "Year is required",
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="volume"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Volume</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL Jurnal (Opsional)</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel>Deskripsi</FormLabel>
                      <FormControl>
                        <Textarea className="min-h-[80px]" {...field} />
                      </FormControl>
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
                      setEditingJournal(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="cursor-pointer">
                    {editingJournal ? "Update" : "Create"}
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

export default AdminJournal;
