import { upsertSettingsAction } from "@/app/backoffice/actions";
import { AdminCard, AdminHeader, Field } from "@/components/backoffice/admin-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getBackofficeContentLists } from "@/lib/backoffice-data";
import { site } from "@/lib/site-data";

const fields = [
  { key: "phone", label: "Telefone", fallback: site.phone },
  { key: "whatsapp", label: "WhatsApp", fallback: site.whatsapp },
  { key: "email", label: "Email", fallback: site.email },
  { key: "address", label: "Endereço", fallback: site.address },
  { key: "facebook", label: "Facebook", fallback: site.socials.facebook },
  { key: "instagram", label: "Instagram", fallback: site.socials.instagram },
  { key: "linkedin", label: "LinkedIn", fallback: site.socials.linkedin }
];

export default async function BackofficeSettingsPage() {
  const content = await getBackofficeContentLists();
  const settings = new Map(content.siteSettings.map((setting) => [setting.key, setting.value]));

  return (
    <>
      <AdminHeader
        title="Definições"
        description="Guarde dados comerciais e canais sociais no Convex para manter uma fonte administrativa central."
      />
      <AdminCard className="max-w-4xl">
        <form action={upsertSettingsAction} className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            {fields.map((field) => (
              <Field key={field.key} label={field.label}>
                <Input name={field.key} defaultValue={settings.get(field.key) ?? field.fallback} />
              </Field>
            ))}
          </div>
          <Button type="submit" variant="green">
            Guardar definições
          </Button>
        </form>
      </AdminCard>
    </>
  );
}
