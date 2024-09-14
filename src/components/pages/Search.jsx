import React from 'react';
import { Map } from 'react-kakao-maps-sdk';
import { SlArrowRight, SlMagnifier } from 'react-icons/sl';
import { CiMedicalCross } from 'react-icons/ci';
import { useQuery } from '@tanstack/react-query';
import { fetchPharmacies } from '../../core/instance/axiosInstance';

const Search = () => {
  const {
    data: pharmacies,
    isPending,
    isError
  } = useQuery({
    queryKey: ['pharmacies'],
    queryFn: fetchPharmacies
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <section className=" flex flex-row justify-center bg-custom-yellow p-5">
      <article className="flex flex-col items-start bg-white p-5">
        <div className="border-8">
          <input type="text" />
          <button>
            <SlMagnifier />
          </button>
        </div>
        <ul>
          {pharmacies.map((pharmacy, index) => (
            <li key={index} className="flex flex-row items-center gap-3">
              <CiMedicalCross />
              <div>
                <h3>{pharmacy.name}</h3>
                <p>{pharmacy.address}</p>
                <span>{pharmacy.phone}</span>
              </div>
              <SlArrowRight />
            </li>
          ))}
        </ul>
      </article>
      <article>
        <Map center={{ lat: 33.450701, lng: 126.570667 }} style={{ width: '800px', height: '600px' }} level={3} />
      </article>
    </section>
  );
};

export default Search;
