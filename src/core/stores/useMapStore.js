import { produce } from 'immer';
import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // 새로고침을 하더라도 데이터가 남아있도록

const useMapStore = create(
  persist((set) => ({
    center: { lat: 37.5665, lng: 126.978 }, // 기본 지도 중심 좌표
    level: 3, // 기본 지도 확대 레벨

    // 지도 중심 설정
    setCenter: (center) =>
      set(
        produce((state) => {
          state.center = center;
        })
      ),

    // 지도 확대 레벨 설정
    setLevel: (level) =>
      set(
        produce((state) => {
          state.level = level;
        })
      )
  }))
);

export default useMapStore;
