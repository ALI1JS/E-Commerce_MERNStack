const MeetTheTeam = () => {
  return (
    <div className="w-[90vhmin] h-[50vhmin] flex flex-col gap-5 p-5">
      <h2 className="font-bold text-center capitalize">Meet the Team</h2>
      <div className="overflow-scroll snap snap-x">
        <div className="snap-center p-8 rounded bg-white">
          <img src="/team-member-1.jpg" alt="Team Member 1" />
          <h3>John Doe</h3>
          <p>CEO</p>
        </div>
        <div className="snap-center p-8 rounded bg-white ">
          <img src="/team-member-2.jpg" alt="Team Member 2" />
          <h3>Jane Smith</h3>
          <p>COO</p>
        </div>
        <div className="snap-center p-8 rounded bg-white">
          <img src="/team-member-2.jpg" alt="Team Member 2" />
          <h3>Jane Smith</h3>
          <p>COO</p>
        </div>
        <div className="snap-center p-8 rounded bg-white">
          <img src="/team-member-2.jpg" alt="Team Member 2" />
          <h3>Jane Smith</h3>
          <p>COO</p>
        </div>
        <div className="snap-center p-8 rounded bg-white">
          <img src="/team-member-2.jpg" alt="Team Member 2" />
          <h3>Jane Smith</h3>
          <p>COO</p>
        </div>
      </div>
    </div>
  );
};

export default MeetTheTeam;