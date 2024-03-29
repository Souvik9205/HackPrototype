import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import User from "../(models)/User";
import { Avatar } from "@nextui-org/react";
import {
  Progress,
  Tooltip,
  Button,
  Card,
  CardHeader,
  CardBody,
  Divider,
} from "@nextui-org/react";
import dynamic from "next/dynamic";

const DynamicChart = dynamic(
  () => import("../(components)/(dashboard)/Chart"),
  {
    ssr: false,
  }
);

const page = async () => {
  const session = await getServerSession(options);
  const LevelColor = ["warning", "secondary", "primary", "success", "danger"];
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/client");
  }
  const userEmail = session?.user?.email;
  const foundUser = await User.findOne({ email: userEmail });
  if (!foundUser) {
    return (
      <div>
        <h1>User Not Found</h1>
      </div>
    );
  }
  const { email, point } = foundUser;
  const currentHour = new Date().getHours();
  const greeting =
    currentHour >= 5 && currentHour < 12
      ? "MORNING"
      : currentHour >= 12 && currentHour < 18
      ? "AFTERNOON"
      : currentHour >= 18 && currentHour < 21
      ? "EVENING"
      : "NIGHT";
  let LvProgress, currentLv;
  if (point < 100) {
    LvProgress = point;
    currentLv = 0;
  } else {
    LvProgress = Math.floor(point % 100);
    currentLv = Math.floor(point / 100);
  }
  return (
    <div className="grid grid-cols-5 h-full">
      <div className="col-span-1 p-3 flex flex-col gap-3 items-center border border-neutral-800 border-t-0 border-l-0 border-r-2 border-b-0">
        <div>
          <h2 className="text-xl font-bold pb-4">GOOD {greeting} USER!</h2>
        </div>
        <div>
          <Avatar
            isBordered
            color={LevelColor[currentLv]}
            src="Avatar.jpg"
            size="lg"
            radius="md"
          />
        </div>
        <div>
          <h1>{email}</h1>
        </div>
        <div className="pt-5">
          <h2>Current point: {point}</h2>
        </div>
        <div className="w-2/3">
          <Progress
            size="sm"
            radius="sm"
            classNames={{
              base: "max-w-md",
              track: "drop-shadow-md border border-default",
              label: "tracking-wider font-medium text-default-600",
              value: "text-foreground/60",
            }}
            color={LevelColor[currentLv + 1]}
            label="Level Progress"
            value={LvProgress}
            showValueLabel={true}
          />
        </div>
        <div className="pt-10">
          <Tooltip
            placement="bottom-end"
            showArrow={true}
            content={
              <div className="px-1 py-2 border border-amber-300">
                <div className="text-small font-bold">Level System:</div>
                <div className="text-tiny">
                  we will get points after analysing video here and according to
                  the points there are 5 levels
                </div>
                <div className="flex flex-col gap-2 p-3 justify-center items-center">
                  <div>level 1 : points 0-100</div>
                  <div>level 2 : points 101-200</div>
                  <div>level 3 : points 201-300</div>
                  <div>level 4 : points 301-400</div>
                  <div>level 5 : points 401-unlimited</div>
                </div>
              </div>
            }
          >
            <Button variant="bordered">More about Level system</Button>
          </Tooltip>
        </div>
      </div>
      <div className="col-span-4 flex flex-col gap-2 items-center justify-center p-3 px-10">
        <div>
          <h1 className="text-3xl font-bold pb-3">Analytics</h1>
        </div>
        <div className="w-full">
          <p className="text-lg font-semibold pb-3">Previous records:</p>
          {foundUser.record.length > 1 ? (
            <div>
              {foundUser.record.map((item, index) => (
                <Card key={index} className="border border-amber-400">
                  <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                      <p className="text-md">No: {index + 1}</p>
                      <p className="text-small text-default-500">
                        {new Date(item.date).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <p>Score: {item.score}</p>
                  </CardBody>
                </Card>
              ))}
            </div>
          ) : (
            <div>
              <Card className="border border-amber-400">
                <CardHeader className="flex gap-3">
                  <div className="flex flex-col">
                    <p className="text-md">No Records Found!</p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p>Try analysing videos to get points...</p>
                </CardBody>
              </Card>
            </div>
          )}
        </div>
        <Divider />
        <div className="w-full p-6 flex justify-center items-center">
          <DynamicChart record={foundUser.record} />
        </div>
      </div>
    </div>
  );
};

export default page;
