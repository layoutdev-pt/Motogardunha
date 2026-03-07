import MotorcycleForm from "@/components/admin/MotorcycleForm";

export default function AdminAddMotoPage() {
  return (
    <MotorcycleForm
      mode="create"
      title="Adicionar Motociclo"
      subtitle="Preencha os detalhes do novo motociclo"
    />
  );
}
