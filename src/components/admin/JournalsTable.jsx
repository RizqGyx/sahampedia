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
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { DialogDescription } from "@radix-ui/react-dialog";

const API_URL = "http://127.0.0.1:5000/api/v1/journals";

export function JournalsTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [journals, setJournals] = useState([]);
  const [editingJournal, setEditingJournal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

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

  const emptyJournal = {
    title: "",
    authors: "",
    journal: "",
    year: "",
    volume: "",
    url: "",
    description: "",
  };

  const fetchJournals = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setJournals(response.data.journals || []);
    } catch (err) {
      toast.error("Gagal memuat data jurnal");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  const openCreateDialog = () => {
    form.reset(emptyJournal);
    setEditingJournal(null);
    setIsOpen(true);
  };

  const handleEdit = (journal) => {
    form.reset(journal);
    setEditingJournal(journal);
    setIsOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus jurnal ini?")) return;
    setDeletingId(id);
    try {
      await axios.delete(`${API_URL}/${id}`);
      setJournals((prev) => prev.filter((j) => j.id !== id));
      toast.success("Jurnal berhasil dihapus");
    } catch (err) {
      toast.error("Gagal menghapus jurnal");
    } finally {
      setDeletingId(null);
    }
  };

  const onSubmit = async (data) => {
    const journalData = {
      ...data,
      year: parseInt(data.year) || new Date().getFullYear(),
    };

    setSubmitting(true);
    try {
      if (editingJournal) {
        const response = await axios.put(
          `${API_URL}/${editingJournal.id}`,
          journalData
        );
        setJournals((prev) =>
          prev.map((j) => (j.id === response.data.id ? response.data : j))
        );
        toast.success("Jurnal berhasil diperbarui");
      } else {
        const response = await axios.post(API_URL, journalData);
        setJournals((prev) => [...prev, response.data.journal]);
        toast.success("Jurnal berhasil ditambahkan");
      }
      setIsOpen(false);
      form.reset(emptyJournal);
      setEditingJournal(null);
    } catch (err) {
      toast.error("Gagal menyimpan jurnal");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Daftar Jurnal</h2>
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
                  className="cursor-pointer"
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsOpen(false);
                    form.reset(emptyJournal);
                    setEditingJournal(null);
                  }}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="cursor-pointer"
                >
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

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Judul</TableHead>
              <TableHead>Penulis</TableHead>
              <TableHead>Jurnal</TableHead>
              <TableHead>Tahun</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow key={"loading"}>
                <TableCell colSpan={5} className="text-center py-6">
                  <Loader2 className="animate-spin h-5 w-5 mx-auto" />
                </TableCell>
              </TableRow>
            ) : journals.length === 0 ? (
              <TableRow key={"empty"}>
                <TableCell
                  colSpan={5}
                  className="text-center py-6 text-muted-foreground"
                >
                  Belum ada jurnal.
                </TableCell>
              </TableRow>
            ) : (
              journals
                .filter((journal) => journal?.id)
                .map((journal) => {
                  return (
                    <TableRow key={journal.id}>
                      <TableCell>{journal.title}</TableCell>
                      <TableCell>{journal.authors}</TableCell>
                      <TableCell>{journal.journal}</TableCell>
                      <TableCell>{journal.year}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {journal.url && (
                            <a
                              href={journal.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button
                                className="cursor-pointer"
                                variant="ghost"
                                size="icon"
                              >
                                <ExternalLink size={16} />
                              </Button>
                            </a>
                          )}
                          <Button
                            className="cursor-pointer"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(journal)}
                          >
                            <Pencil size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(journal.id)}
                            disabled={deletingId === journal.id}
                          >
                            {deletingId === journal.id ? (
                              <Loader2 size={16} className="animate-spin" />
                            ) : (
                              <Trash size={16} />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
