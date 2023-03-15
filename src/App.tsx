import "./App.scss";
import { Sample1, Sample2 } from "./components";

export default function App() {
  return (
    <section className="grid grid-rows-[auto_1fr] h-screen p-5">
      <h1 className="w-full text-center text-3xl font-bold pb-4">
        &infin; Infinite Query &amp; Scroll
      </h1>
      <div className="w-full grid grid-cols-2 gap-4 overflow-hidden">
        <Sample1 />
        <Sample2 />
      </div>
    </section>
  );
}
