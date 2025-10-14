import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleUpdate = async () => {};

  const handleAvatarChange = async () => {
      console.log("the avatar is changed secussfully!");
      
  };
  
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     setLoading(true)
  //     try {
        
  //     }
  //   }
  // })

  return (
    <div className="w-full h-full flex flex-col justify-center items-center mt-30">
      <div className="w-200 h-100 rounded-xl box-border border-solid border-black shadow-2xl">
        <h1 className="text-2xl font-bold mb-3 mt-5 text-center">
          User Profile
        </h1>
        <h2 className="text-center">
          In this page, you can change your informations~
        </h2>
        <form className="flex box-border m-10 gap-20">
          <div className="flex flex-col items-center ml-10">
            <Avatar className="w-30 h-30 items-center mb-5">
              <AvatarImage
                src="https://avatars.githubusercontent.com/u/186951280?v=4"
                alt="@shadcn"
              />
            </Avatar>
            <Button type="button" onClick={handleAvatarChange}>Change avatar</Button>
          </div>
          <div className="w-full">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                  Username
                </FieldLabel>
                <Input
                  id="checkout-7j9-card-name-43j"
                  placeholder="{username}"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="ccheckout-7j9-card-name-43j">
                  Nickname
                </FieldLabel>
                <Input
                  id="checkout-7j9-card-name-43j"
                  placeholder="{nickname}"
                  required
                />
              </Field>
            </FieldGroup>
            <div className="mt-10">
              <Button
                type="submit"
                onClick={handleUpdate}
                disabled={loading}
                className="bg-blue-400"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Update"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
