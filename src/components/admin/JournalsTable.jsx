import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { Plus, Pencil, Trash, ExternalLink, Loader2 } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

const API_URL = "http://127.0.0.1:5000/api/v1/journals";

export function JournalsTable() {
  const [journals, setJournals] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingJournal, setEditingJournal] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedJournalId, setSelectedJournalId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setJournals(response.data.journals || []);
    } catch (err) {
      toast.error("Gagal mengambil data jurnal");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  const handleDelete = async () => {
    if (!selectedJournalId) return;
    setIsDeleting(true);
    try {
      await axios.delete(`${API_URL}/${selectedJournalId}`);
      toast.success("Jurnal berhasil dihapus");
      fetchJournals();
    } catch (err) {
      toast.error("Gagal menghapus jurnal");
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
      !data.volume.trim() ||
      !data.url.trim() ||
      !data.description.trim()
    ) {
      toast.error("Semua field wajib diisi");
      return;
    }

    setSubmitting(true);
    try {
      if (editingJournal) {
        const updatedJournal = { ...editingJournal, ...data };
        await axios.put(`${API_URL}/${editingJournal.id}`, updatedJournal);
        toast.success("Jurnal berhasil diperbarui");
      } else {
        await axios.post(API_URL, data);
        toast.success("Jurnal berhasil ditambahkan");
      }

      fetchJournals();
      form.reset();
      setIsOpen(false);
      setEditingJournal(null);
    } catch (error) {
      toast.error("Gagal menyimpan jurnal");
      console.error(error);
    } finally {
      setSubmitting(false);
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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Journals</h2>
        <Button onClick={openCreateDialog} className="cursor-pointer">
          <Plus className="mr-2 w-4 h-4" />
          Tambah Jurnal
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-center">
              {editingJournal ? "Edit" : "Tambah"} Jurnal
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-center">
            {editingJournal
              ? "Ubah data jurnal dan simpan perubahan."
              : "Isi form berikut untuk menambahkan jurnal baru."}
          </DialogDescription>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                rules={{ required: "Judul wajib diisi" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul</FormLabel>
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
                  rules={{ required: "Penulis wajib diisi" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Penulis</FormLabel>
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
                  rules={{ required: "Nama jurnal wajib diisi" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jurnal</FormLabel>
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
                    required: "Tahun wajib diisi",
                    min: { value: 1900, message: "Minimal tahun 1900" },
                    max: { value: 2100, message: "Maksimal tahun 2100" },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tahun</FormLabel>
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
                rules={{
                  pattern: {
                    value: /^(https?:\/\/.*)?$/,
                    message: "URL tidak valid",
                  },
                }}
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
                  Batal
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  {editingJournal ? "Simpan Perubahan" : "Tambah"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <div className="rounded-md border overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Jurnal ID</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Penulis</TableHead>
              <TableHead>Jurnal</TableHead>
              <TableHead>Tahun</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  <Loader2 className="animate-spin h-5 w-5 mx-auto" />
                </TableCell>
              </TableRow>
            ) : journals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  Belum ada jurnal.
                </TableCell>
              </TableRow>
            ) : (
              journals.map((journal) => (
                <TableRow key={journal.id}>
                  <TableCell
                    className="max-w-[100px] truncate whitespace-nowrap"
                    title={journal.id}
                  >
                    {journal.id}
                  </TableCell>
                  <TableCell
                    className="max-w-[200px] truncate whitespace-nowrap"
                    title={journal.title}
                  >
                    {journal.title}
                  </TableCell>
                  <TableCell
                    className="max-w-[100px] truncate whitespace-nowrap"
                    title={journal.authors}
                  >
                    {journal.authors}
                  </TableCell>
                  <TableCell
                    className="max-w-[100px] truncate whitespace-nowrap"
                    title={journal.journal}
                  >
                    {journal.journal}
                  </TableCell>
                  <TableCell>{journal.year}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(journal)}
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedJournalId(journal.id);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        onConfirm={() => handleDelete(selectedJournalId)}
        title="Hapus Jurnal"
        description={`Data jurnal dengan ID: ${selectedJournalId} akan dihapus secara permanen. Anda yakin ingin melanjutkan?`}
        loading={isDeleting}
      />
    </div>
  );
}
