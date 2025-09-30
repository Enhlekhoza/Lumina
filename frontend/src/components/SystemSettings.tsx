import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Bell, Shield, Palette } from "lucide-react";

const SystemSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Settings</CardTitle>
        <CardDescription>Manage platform-wide settings and configurations.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center space-x-4">
            <Bell className="w-6 h-6 text-primary" />
            <div>
              <Label htmlFor="notifications-switch" className="font-semibold">Enable Global Notifications</Label>
              <p className="text-sm text-muted-foreground">Send system-wide announcements to all users.</p>
            </div>
          </div>
          <Switch id="notifications-switch" />
        </div>
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center space-x-4">
            <Shield className="w-6 h-6 text-primary" />
            <div>
              <Label htmlFor="maintenance-switch" className="font-semibold">Maintenance Mode</Label>
              <p className="text-sm text-muted-foreground">Temporarily disable access for non-admin users.</p>
            </div>
          </div>
          <Switch id="maintenance-switch" />
        </div>
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center space-x-4">
            <Palette className="w-6 h-6 text-primary" />
            <div>
              <Label htmlFor="theme-switch" className="font-semibold">Enable Dark Mode by Default</Label>
              <p className="text-sm text-muted-foreground">Set the default theme for all new users.</p>
            </div>
          </div>
          <Switch id="theme-switch" checked />
        </div>
        <div className="flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemSettings;
