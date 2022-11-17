import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { FiAlertCircle, FiZap, FiCheck } from "react-icons/fi";

export default function GerirPedidos() {
  const data = [
    {
      label: "Formações pendentes",
      value: "pendentes",
      icon: <FiAlertCircle />,
      desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people 
      who are like offended by it, it doesn't matter.`,
    },
    {
      label: "Formações a decorrer",
      value: "decorrer",
      icon: <FiZap />,
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },

    {
      label: "Formações terminadas",
      value: "terminadas",
      icon: <FiCheck />,
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're 
      constantly trying to express ourselves and actualize our dreams.`,
    },
  ];

  return (
    <Tabs value="pendentes">
      {/* First value */}
      <TabsHeader className="gap-8 px-[0.625rem] top-[5.625rem] left-8 items-start">
        {data.map(({ label, value, icon }) => (
          <Tab
            key={value}
            value={value}
            className="w-fit border-b-[0.063rem] border-gray4 text-gray4 font-IBM lowercase hover:border-primary hover:text-primary"
          >
            <div className="gap-2 flex flex-row justify-between items-center">
              {icon}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody className="">
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
