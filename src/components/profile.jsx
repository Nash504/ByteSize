import Image from 'next/image';

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React from 'react';
import { Description } from '@radix-ui/react-dialog';


    const Profile = ({ img,name,Description, alt = "Profile Image" }) => {
        return (
            <Card className="flex flex-col items-center justify-center p-4 space-y-4">
                <CardHeader>
                    <Image 
                        src={img} 
                        alt={alt} 
                        name={name}
                        Description={Description}
                        width={200} 
                        height={200} 
                    />
                </CardHeader>
                <CardTitle className="text-2xl font-bold">{name}</CardTitle>
                <CardDescription className="text-lg">{Description}</CardDescription>
                <CardFooter>
                    <div className="flex items-center justify-center space-x-4">
                    <a
                href="https://www.linkedin.com/in/srijan-kulal"
                target="_blank"
                class="linkedin-icon"
              >
                <i class="fab fa-linkedin"></i>
              </a>
                       

                    <a href="
                    /"
                    className="text-blue-500 hover:underline"
                    ><i class="fab fa-github"></i>
                    </a>
                    </div>

                </CardFooter>
            </Card>
        );
    };

export default Profile;