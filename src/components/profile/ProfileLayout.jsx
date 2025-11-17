import React from "react";
import ProfileSidebar from "./ProfileSidebar.jsx";
import ProfileHeroCard from "./ProfileHeroCard.jsx";
import ProfileSettings from "./ProfileSettings.jsx";

export default function ProfileLayout() {
    return (
        <section className="max-w-[1200px] mx-auto px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-3">
                    <ProfileSidebar />
                </div>

                <div className="md:col-span-4">
                    <ProfileHeroCard />
                </div>

                <div className="md:col-span-5">
                    <ProfileSettings />
                </div>
            </div>
        </section>
    );
}
