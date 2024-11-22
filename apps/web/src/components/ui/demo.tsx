export const Demo = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="w-full h-full bg-base-200 rounded-md"></div>
        <div className="w-full h-full bg-base-300 rounded-md"></div>
        <div className="w-full h-full bg-base-content rounded-md"></div>
      </div>
      <div className="flex gap-2">
        <div className="w-full h-full bg-neutral-200 rounded-md"></div>
        <div className="w-full h-full bg-neutral-300 rounded-md"></div>
        <div className="w-full h-full bg-neutral-content rounded-md"></div>
      </div>
    </div>
  );
};
