import { ArrowRight, AtSign, Cookie, Github, Heart, InfoIcon, LogInIcon, MoonIcon, SunIcon } from "lucide-react";
import Link from "next/link";
import PingAuth from "~/components/Auth";
import { EmailSubscription } from "~/components/EmailSubscription";
import { LensTextDark, LensTextLight } from "~/components/Icons";
import { ThemeToggle } from "~/components/ThemeProvider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { quicksand } from "~/styles/fonts";

const LandingPage = () => {
  return (
    <div className={`flex flex-col mx-auto max-w-5xl min-w-0 ${quicksand.className}`}>
      <div className="w-full">
        <div className="p-4 rounded-t-none flex place-content-between">
          <Link className="flex flex-row gap-4 items-center " href="/">
            <AtSign className="dark:drop-shadow-glow-sm drop-shadow-md" size={35} />
            <div className="text-3xl font-bold dark:drop-shadow-glow drop-shadow-md  -mt-1.5 -ml-2">pingpad</div>
          </Link>

          <div className="flex gap-4 items-center ">
            <ThemeToggle />
            <div className="dark:drop-shadow-glow drop-shadow-md ">
              <Dialog>
                <DialogTrigger asChild>
                  <Button disabled variant="default" size="sm_icon">
                    <div className="hidden sm:flex mr-2 disabled">Closed Beta</div>
                    <LogInIcon />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[350px]">
                  <DialogTitle>
                    <h3 className="text-center">Sign in to Ping </h3>
                  </DialogTitle>
                  <PingAuth />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <div className="flex px-auto grow items-center justify-center py-10 mt-16">
          <div className="text-3xl p-8 text-center drop-shadow-md dark:drop-shadow-glow place-items-center flex flex-col gap-6 justify-center">
            <h1>
              a <b>better </b> decentralized social
            </h1>
            <div className="hidden md:block">
              <br />
              <h1>
                staying <b>out of the way</b>
              </h1>
              <h1>
                to reach <b>your</b> people
              </h1>
              <Link className="hover:underline -mt-16 -mb-24  flex items-center gap-2" href={"https://lens.xyz"}>
                <div className="dark:hidden">
                  <LensTextDark />
                </div>
                <div className="dark:flex hidden">
                  <LensTextLight />
                </div>
              </Link>
            </div>
          </div>

          {/* <div className="flex flex-col gap-4 px-2 w-2/3 md:w-full mx-auto">{postsList}</div> */}

          <div className="block md:hidden text-3xl p-8 text-center drop-shadow-lg dark:drop-shadow-glow">
            <h1>
              staying <b>out of the way</b> to reach <b>your</b> people.
            </h1>
          </div>
        </div>

        <div className="w-full p-8 mt-16 text-center drop-shadow-lg dark:drop-shadow-glow flex flex-col justify-center items-center">
          <div className="-mt-20 text-xl flex flex-col gap-4">
            Stay up to date
            <EmailSubscription />
          </div>
          {/* <p className="text-lg">
            part of{" "}
            <a className="hover:underline" href="https://net.kualta.dev/">
              Kunet Global Network
            </a>
          </p> */}
        </div>
        <Card className="flex flex-col gap-4 place-items-center mx-auto max-w-3xl p-4 my-32">
          <CardHeader>
            <CardTitle> FAQ </CardTitle>
          </CardHeader>
          <CardContent className="w-full max-w-3xl">
            <div className="w-full max-w-3xl">
              <Accordion type="single">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Current status?</AccordionTrigger>
                  <AccordionContent>
                    In development. Ping (centralized version) has retired, and Pingpad is currently being
                    decentralized.
                    {/* decentralized.{" "}
                    <a className="underline" href="https://github.com/kualta/ping">
                      Contributions
                    </a>{" "}
                    are welcome. */}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>When open for all?</AccordionTrigger>
                  <AccordionContent>
                    Pingpad in currently in closed Beta, gathering feedback and improving the experience. <br />
                    <br /> Subscribe to the newsletter above to get in early.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is it any good?</AccordionTrigger>
                  <AccordionContent>Yes.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8 place-items-center justify-center p-4 drop-shadow-lg dark:drop-shadow-glow my-20">
          <Link href="https://kualta.dev">
            <Button variant="ghost" className="p-1 px-4 text-lg gap-4 flex flex-row w-fit rounded-full">
              <Heart /> by kualta with love
            </Button>
          </Link>
          <Link href="https://github.com/kualta/ping">
            <Button variant="ghost" className="p-1 px-4 text-lg gap-4 flex flex-row w-fit rounded-full">
              <Github /> GitHub
            </Button>
          </Link>
          {/* <Link href="/about">
            <Button variant="ghost" className="p-1 px-4 text-lg gap-4 flex flex-row w-fit rounded-full">
              <InfoIcon /> About
            </Button>
          </Link> */}
          {/* <Link href="https://ping.kualta.dev/policy">
            <Button variant="ghost" className="p-1 px-4 text-lg gap-4 flex flex-row w-fit rounded-full">
              <Cookie /> Privacy
            </Button>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;