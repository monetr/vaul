'use client';

export default function Page() {
  return (
    <div className='bg-zinc-100 space-y-10'>
      <p className='pb-[120vh] bg-zinc-600 text-white font-bold'>scroll down</p>
      <p className='py-32 bg-zinc-800 text-white' data-testid='content'>
        content only visible after scroll
      </p>
    </div>
  );
}
