import Form from "@/components/Form";

export default function Home() {
  return (
    <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
      <section className="max-w-7xl mx-auto">
        <div>
          <h1 className="font-extrabold text-[#222328] text-[32px]">AutoGPT</h1>
          <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          Create an agent by adding a name / goal, and hitting deploy!
          </p>
        </div>
        <Form/>
        {/* form section start here  */}
        
      </section>
      
    </main>
  );
}
