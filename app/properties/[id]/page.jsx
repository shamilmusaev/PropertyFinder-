"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProperty } from "@/utils/requests";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import Link from "next/link";
import PropertyDetails from "@/components/PropertyDetails";
import Spinner from "@/components/Spinner";
import { FaArrowLeft } from "react-icons/fa";
import PropertyImages from "@/components/PropertyImages";
import PropertySellerInfo from "@/components/PropertySellerInfo";

// Компонент страницы для отображения свойства по его идентификатору.
// При загрузке страницы выполняется асинхронный запрос к API для получения данных о свойстве.
// Когда запрос завершается, содержимое свойства отображается на странице.

const PropertyPage = () => {
  const { id } = useParams(); // Получаем идентификатор свойства из параметров URL
  const [property, setProperty] = useState(null); // Состояние свойства и его обновление
  const [loading, setLoading] = useState(true); // Состояние загрузки свойства и его обновление

  // Выполняем useEffect для выполнения асинхронного запроса при загрузке страницы или при изменении свойства
  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return; // Если идентификатор отсутствует, прекращаем выполнение
      try {
        const fetchedProperty = await fetchProperty(id); // Выполняем асинхронный запрос к API для получения данных о свойстве
        setProperty(fetchedProperty); // Обновляем содержимое свойства
      } catch (error) {
        console.error("Ошибка при получении данных", error); // Выводим сообщение об ошибке в консоль
      } finally {
        setLoading(false); // Устанавливаем статус загрузки в false
      }
    };
    if (property === null) {
      fetchPropertyData(); // Выполняем асинхронный запрос при первой загрузке страницы
    }
  }, [id, property]);

  // Если свойство еще не загружено и нет ошибок, отображаем сообщение "Property Not Found"
  if (!property && !loading) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property Not Found
      </h1>
    );
  }

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && property && (
        <>
          <PropertyHeaderImage image={property.images[0]} />
          <section>
            <div className="container m-auto py-6 px-6">
              <Link
                href="/properties"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <FaArrowLeft className="mr-2" /> Back to Properties
              </Link>
            </div>
          </section>

          <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
              <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <PropertyDetails property={property} />
                <PropertySellerInfo property={property} />
              </div>
            </div>
          </section>
          <PropertyImages images={property.images} />
        </>
      )}
    </>
  );
};

export default PropertyPage;
