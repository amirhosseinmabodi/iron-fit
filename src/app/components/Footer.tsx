import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 grid grid-cols-4 gap-8 p-8 text-white">
      <div className="col-span-2">
        <h1 className="text-2xl text-orange-500 font-bold">IronFit</h1>
        <p className="text-sm">
          The city's premier fitness center with modern facilities and
          professional trainers. Experience a different approach to fitness in a
          friendly and motivating environment.
        </p>
      </div>
      <div>
        <h1 className="text-2xl text-orange-500 font-bold">Quick Links</h1>
        <ul>
          <li>
            <Link href="/classes"></Link>classes
          </li>
          <li>Trainers</li>
          <li>Membership</li>
          <li>Terms & Rules</li>
        </ul>
      </div>
      <div>
        <h1 className="text-2xl text-orange-500 font-bold">Contact Us</h1>
        <ul>
          <li>+1 (555) 123-4567</li>
          <li>info@ironfit.com</li>
          <li>123 Fitness Street, Downtown</li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
