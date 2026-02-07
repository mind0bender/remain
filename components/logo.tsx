export default function Logo() {
  return (
    <span className={`rounded-full text-xl font-mono`}>
      <span
        className={`rounded-l-full pl-2 pr-px py-1 border border-r-0 bg-stone-200 border-stone-500 text-stone-950 font-semibold`}
      >
        Rem
      </span>
      <span
        className={`rounded-r-full pr-2 pl-px py-1 border-r border-y bg-stone-950 border-stone-500 text-stone-200 font-semibold`}
      >
        ain
      </span>
    </span>
  );
}
