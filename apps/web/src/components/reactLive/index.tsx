"use client";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

const scope: Parameters<typeof LiveProvider>[0]["scope"] = {
  cn,
  ...React,
};

const ReactLive = () => {
  const [componentCode, setComponentCode] = useState("");
  const [demoCode, setDemoCode] = useState("");
  const fullCode = componentCode + "\nrender(" + demoCode + ")";
  console.log(fullCode);
  return (
    <div className="grid grid-cols-2  gap-5">
      <div className="col-span-2 ">
        <LiveProvider code={fullCode} scope={scope} noInline>
          <LivePreview />
          <LiveError />
        </LiveProvider>
      </div>
      <LiveProvider scope={scope}>
        <div>
          <LiveEditor
            className="rounded-sm overflow-auto"
            onChange={(code) => {
              setComponentCode(code);
            }}
          />
        </div>
      </LiveProvider>
      <LiveProvider scope={scope}>
        <div>
          <LiveEditor
            className="rounded-sm overflow-auto"
            onChange={(code) => setDemoCode(code)}
          />
        </div>
      </LiveProvider>
    </div>
  );
};

export default ReactLive;
