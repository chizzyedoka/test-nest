"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Bell, Cpu, Lock, LucideIcon, Wallet } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from "framer-motion";

export function SettingsPageComponent() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [hardwareConnected, setHardwareConnected] = useState(false);
  const [hardwareType, setHardwareType] = useState<"gpu" | "cpu" | "">("");

  const toggleWalletConnection = () => {
    setWalletConnected(!walletConnected);
  };

  const handleHardwareConnection = () => {
    setHardwareConnected(!hardwareConnected);
  };

  return (
    <div className='container mx-auto py-4 px-4 sm:py-10 sm:px-6'>
      <h1 className='text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
        Settings
      </h1>
      <Tabs defaultValue='account' className='space-y-6'>
        <TabsList className='w-full flex flex-wrap justify-start sm:justify-start bg-gray-100 dark:bg-gray-800 p-1 rounded-lg'>
          {["account", "hardware", "notifications", "security"].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className='flex-grow sm:flex-grow-0 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400 rounded-md transition-all duration-300'>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
        {["account", "hardware", "notifications", "security"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}>
              <Card className='border-none shadow-lg overflow-hidden bg-white dark:bg-gray-800'>
                <CardHeader className='bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6'>
                  <CardTitle className='text-2xl'>
                    {tab.charAt(0).toUpperCase() + tab.slice(1)} Settings
                  </CardTitle>
                  <CardDescription className='text-gray-100'>
                    Manage your {tab} details and preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className='p-6 space-y-6'>
                  {/* Content for each tab */}
                  {tab === "account" && (
                    <>
                      <AccountSettings
                        walletConnected={walletConnected}
                        toggleWalletConnection={toggleWalletConnection}
                      />
                    </>
                  )}
                  {tab === "hardware" && (
                    <>
                      <HardwareSettings
                        hardwareConnected={hardwareConnected}
                        hardwareType={hardwareType}
                        setHardwareType={setHardwareType}
                        handleHardwareConnection={handleHardwareConnection}
                      />
                    </>
                  )}
                  {tab === "notifications" && (
                    <>
                      <NotificationSettings />
                    </>
                  )}
                  {tab === "security" && (
                    <>
                      <SecuritySettings />
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

// Subcomponents for each settings section
function AccountSettings({
  walletConnected,
  toggleWalletConnection,
}: {
  walletConnected: boolean;
  toggleWalletConnection: () => void;
}) {
  return (
    <>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-lg'>
        <div className='flex items-center space-x-4 mb-2 sm:mb-0'>
          <Wallet className='h-5 w-5 text-purple-500' />
          <div>
            <p className='font-medium'>Wallet Connection</p>
            <p className='text-sm text-muted-foreground'>
              {walletConnected ? "Connected" : "Not connected"}
            </p>
          </div>
        </div>
        <Button
          onClick={toggleWalletConnection}
          className='w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300'>
          {walletConnected ? "Disconnect" : "Connect"}
        </Button>
      </div>
      <InputField label='Username' id='username' placeholder='Your username' />
      <InputField
        label='Email'
        id='email'
        type='email'
        placeholder='Your email address'
      />
      <div>
        <Label htmlFor='language' className='text-sm font-medium'>
          Language
        </Label>
        <Select>
          <SelectTrigger
            id='language'
            className='mt-1 border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500'>
            <SelectValue placeholder='Select language' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='en'>English</SelectItem>
            <SelectItem value='fr'>French</SelectItem>
            <SelectItem value='de'>German</SelectItem>
            <SelectItem value='es'>Spanish</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}

function HardwareSettings({
  hardwareConnected,
  hardwareType,
  setHardwareType,
  handleHardwareConnection,
}: {
  hardwareConnected: boolean;
  hardwareType: "gpu" | "cpu" | "";
  setHardwareType: (type: "gpu" | "cpu") => void;
  handleHardwareConnection: () => void;
}) {
  return (
    <>
      <div>
        <Label htmlFor='hardware-type' className='text-sm font-medium'>
          Hardware Type
        </Label>
        <Select
          onValueChange={(value) => setHardwareType(value as "gpu" | "cpu")}>
          <SelectTrigger
            id='hardware-type'
            className='mt-1 border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500'>
            <SelectValue placeholder='Select hardware type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='gpu'>GPU</SelectItem>
            <SelectItem value='cpu'>CPU</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {hardwareType && (
        <>
          <InputField
            label='Hardware Specifications'
            id='hardware-specs'
            placeholder={`Enter your ${hardwareType.toUpperCase()} specifications`}
          />
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-lg'>
            <div className='flex items-center space-x-4 mb-2 sm:mb-0'>
              <Cpu className='h-5 w-5 text-purple-500' />
              <div>
                <p className='font-medium'>Connection Status</p>
                <p className='text-sm text-muted-foreground'>
                  {hardwareConnected ? "Connected to CLI" : "Not connected"}
                </p>
              </div>
            </div>
            <Button
              onClick={handleHardwareConnection}
              className='w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300'>
              {hardwareConnected ? "Disconnect" : "Connect to CLI"}
            </Button>
          </div>
        </>
      )}
      <Alert className='bg-purple-100 dark:bg-purple-900 border-purple-200 dark:border-purple-800'>
        <AlertCircle className='h-4 w-4 text-purple-500' />
        <AlertTitle className='text-sm font-semibold text-purple-700 dark:text-purple-300'>
          CLI Setup Instructions
        </AlertTitle>
        <AlertDescription className='text-sm text-purple-600 dark:text-purple-400'>
          1. Download our CLI tool from the official website.
          <br />
          2. Install the CLI following the provided instructions.
          <br />
          3. Run the CLI with your unique API key.
          <br />
          4. Select your hardware type and enter specifications above.
          <br />
          5. Click 'Connect to CLI' to start prompt mining.
        </AlertDescription>
      </Alert>
    </>
  );
}

function NotificationSettings() {
  return (
    <>
      <NotificationToggle
        icon={Bell}
        title='Push Notifications'
        description='Receive push notifications'
      />
      <NotificationToggle
        icon={Bell}
        title='Email Notifications'
        description='Receive email notifications'
      />
    </>
  );
}

function SecuritySettings() {
  return (
    <>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-lg'>
        <div className='flex items-center space-x-4 mb-2 sm:mb-0'>
          <Lock className='h-5 w-5 text-purple-500' />
          <div>
            <p className='font-medium'>Two-Factor Authentication</p>
            <p className='text-sm text-muted-foreground'>
              Add an extra layer of security
            </p>
          </div>
        </div>
        <Button
          variant='outline'
          className='w-full sm:w-auto border-purple-500 text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900'>
          Enable
        </Button>
      </div>
      <div>
        <Label htmlFor='openai-key' className='text-sm font-medium'>
          OpenAI API Key
        </Label>
        <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-1'>
          <Input
            id='openai-key'
            type='password'
            placeholder='Enter your OpenAI API key'
            className='flex-grow border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500'
          />
          <Button
            variant='outline'
            className='w-full sm:w-auto border-purple-500 text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900'>
            Save
          </Button>
        </div>
      </div>
    </>
  );
}

// Utility components
function InputField({
  label,
  id,
  type = "text",
  placeholder,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder: string;
}) {
  return (
    <div>
      <Label htmlFor={id} className='text-sm font-medium'>
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        className='mt-1 border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500'
      />
    </div>
  );
}

function NotificationToggle({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className='flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-lg'>
      <div className='flex items-center space-x-4'>
        <Icon className='h-5 w-5 text-purple-500' />
        <div>
          <p className='font-medium'>{title}</p>
          <p className='text-sm text-muted-foreground'>{description}</p>
        </div>
      </div>
      <Switch className='data-[state=checked]:bg-purple-500' />
    </div>
  );
}
