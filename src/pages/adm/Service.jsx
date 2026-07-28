import { Plus } from "lucide-react";
import { Button } from "../../components/Button";
import { NewServiceForm } from "../../components/form/NewServiceForm";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import { authFetch } from "../../utils/authFetch";
import { ServiceCard } from "../../components/ServiceCard";
import { AlertMessage } from "../../components/AlertMessage";

export function Service() {
  //API URL----------------------------------------------------------------------------------------------------------------------------------
  const url = "http://localhost:8081";

  const [newServiceFormVisibility, setNewServiceFormVisibility] =
    useState(false);

  const [updateServiceFormVisibility, setUpdateServiceFormVisibility] =
    useState(false);

  const [alertMessageVisibility, setAlertMessageVisibility] = useState(false);

  const [serviceId, setServiceId] = useState("");

  const handleOnCancel = () => setNewServiceFormVisibility((prev) => !prev);

  const [services, setServices] = useState([]);

  const [serviceValue, setServiceValue] = useState(0);
  const [serviceDuration, setServiceDuration] = useState(0);
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [serviceActive, setServiceActive] = useState(true);

  const [serviceUpdateValue, setServiceUpdateValue] = useState(0);
  const [serviceUpdateDuration, setServiceUpdateDuration] = useState(0);
  const [serviceUpdateName, setServiceUpdateName] = useState("");
  const [serviceUpdateDescription, setServiceUpdateDescription] = useState("");
  const [serviceUpdateActive, setServiceUpdateActive] = useState(true);

  useEffect(() => {
    async function getServices() {
      const response = await authFetch("/adm/services");
      const data = await response.json();
      setServices(data);
      console.log(data);
    }
    getServices();
  }, []);

  async function createService() {
    try {
      const response = await authFetch("/adm/services", {
        //authFetch -> Método criado para simplificar o fetch -> criado na pasta utils
        method: "POST",
        body: JSON.stringify({
          value: serviceValue,
          duration: serviceDuration,
          name: serviceName,
          description: serviceDescription,
          active: serviceActive,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        console.log(data.message);
        toast.error(data.message);
        return null;
      }
      toast.success("Serviço criado com sucesso!");
      const data = await response.json();
      setNewServiceFormVisibility((prev) => !prev);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async function handleCreateService(e) {
    e.preventDefault();
    const newService = await createService();
    if (!newService) return;
    setServices((prev) => [...prev, newService]);
  }

  async function updateService() {
    try {
      const response = await authFetch(`/adm/services/${serviceId}`, {
        method: "PUT",
        body: JSON.stringify({
          value: serviceUpdateValue,
          duration: serviceUpdateDuration,
          name: serviceUpdateName,
          description: serviceUpdateDescription,
          active: serviceUpdateActive,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        console.log(data.message);
        toast.error(data.message);
        return null;
      }
      const data = await response.json();
      toast.success("Serviço atualizado com sucesso!");
      setUpdateServiceFormVisibility((prev) => !prev);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateService(e) {
    e.preventDefault();

    const updatedService = await updateService();
    console.log(updatedService);

    if (!updatedService) return;

    setServices((services) =>
      services.map((service) =>
        service.id === updatedService.id ? updatedService : service,
      ),
    );
  }

  async function deleteService(id) {
    try {
      const response = await authFetch(`/adm/services/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const data = await response.json();
        console.log(data.message);
        toast.error(data.message);
      }
      toast.success("Serviço deletado com sucesso!");
      return id;
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteService(id) {
    const deletedId = await deleteService(id);

    if (!deletedId) {
      return;
    }

    setServices((services) =>
      services.filter((service) => service.id !== deletedId),
    );
  }

  return (
    <div className="flex flex-col w-full p-10">
      <header className="flex flex-col md:flex-row gap-4 md:gap-0">
        <div className="flex flex-col gap-1 justify-center ">
          <p className="text-amber-300 font-montserrat font-semibold text-lg">Catálogo</p>
          <h1 className="text-4xl font-playfair font-semibold">Serviços</h1>
          <p className="text-gray-400">Cadastre e gerencie seus serviços</p>
        </div>
        <div className="md:ml-auto">
          <Button
            title="Novo Serviço"
            handleOnClick={handleOnCancel}
            icon={Plus}
          />
        </div>
      </header>

      <main className="relative">
        {/* New Service Form */}
        {newServiceFormVisibility && (
          <div className="absolute top-3/1 md:top/2/1 left-1/2 -translate-x-1/2 -translate-y-3/4  md:-translate-y-1/3">
            <NewServiceForm
              title="Novo Serviço"
              handleOnCancel={handleOnCancel}
              handleOnSubmit={handleCreateService}
              nameOnChange={(e) => setServiceName(e.target.value)}
              descriptionOnChange={(e) => setServiceDescription(e.target.value)}
              valueOnChange={(e) => setServiceValue(e.target.value)}
              durationOnChange={(e) => setServiceDuration(e.target.value)}
              activeOnChange={(e) => setServiceActive(e.target.checked)}
              activeValue={serviceActive}
            />
          </div>
        )}

        {/* Update Service Form */}
        {updateServiceFormVisibility && (
          <div className="absolute top-3/1 md:top/2/1 left-1/2 -translate-x-1/2 -translate-y-3/4  md:-translate-y-1/3">
            <NewServiceForm
              title="Atualizar Serviço"
              handleOnCancel={() =>
                setUpdateServiceFormVisibility((prev) => !prev)
              }
              handleOnSubmit={handleUpdateService}
              nameValue={serviceUpdateName}
              descriptionValue={serviceUpdateDescription}
              priceValue={serviceUpdateValue}
              durationValue={serviceUpdateDuration}
              activeValue={serviceUpdateActive}
              nameOnChange={(e) => setServiceUpdateName(e.target.value)}
              descriptionOnChange={(e) =>
                setServiceUpdateDescription(e.target.value)
              }
              valueOnChange={(e) => setServiceUpdateValue(e.target.value)}
              durationOnChange={(e) => setServiceUpdateDuration(e.target.value)}
              activeOnChange={(e) => setServiceUpdateActive(e.target.checked)}
            />
          </div>
        )}

        {alertMessageVisibility && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/4  md:-translate-y-1/3">
            <AlertMessage
              title="Ao excluir este serviço, ele deixará de aparecer para seus clientes. Deseja continuar?"
              handleOnCancel={() => setAlertMessageVisibility((prev) => !prev)}
              handleOnSubmit={() => handleDeleteService(serviceId)}
            />
          </div>
        )}

        {/* Cards de serviços */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mt-20 gap-10">
          {services.map((s) => (
            <ServiceCard
              key={s.id}
              title={s.name}
              description={s.description}
              value={s.value}
              duration={s.duration}
              active={s.active}
              onEditClick={() => {
                setServiceId(s.id);
                setServiceUpdateName(s.name);
                setServiceUpdateDescription(s.description);
                setServiceUpdateValue(s.value);
                setServiceUpdateDuration(s.duration);
                setServiceUpdateActive(s.active);
                setUpdateServiceFormVisibility((prev) => !prev);
              }}
              onTrashClick={() => {
                setServiceId(s.id);
                setAlertMessageVisibility((prev => !prev));
              }}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
