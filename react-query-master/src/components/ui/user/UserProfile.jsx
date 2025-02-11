import { useQuery } from '@tanstack/react-query';
import { MapPin, Phone, Globe, Building2, Mail, User } from 'lucide-react';
import { fetchUserDetails } from '@/api/api';
import { useParams } from 'react-router';

const UserProfile = () => {
    const { id } = useParams();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["user", id],
        queryFn: () => fetchUserDetails(id),
    });

    if (isLoading) return <p>Loading users...</p>;
    if (isError) return <p>Error: {error.message}</p>;
    return (
        <div><div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg my-10">
            <div className="text-center mb-6">
                <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User size={40} className="text-blue-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">{data.name}</h1>
                <p className="text-gray-600">@{data.username}</p>
            </div>

            <div className="space-y-4">
                <div className="flex items-center space-x-3">
                    <Mail className="text-gray-500 w-5 h-5" />
                    <a href={`mailto:${data.email}`} className="text-blue-600 hover:underline">
                        {data.email}
                    </a>
                </div>

                <div className="flex items-start space-x-3">
                    <MapPin className="text-gray-500 w-5 h-5 mt-1" />
                    <div>
                        <p className="text-gray-700">{data.address.street}, {data.address.suite}</p>
                        <p className="text-gray-700">{data.address.city}, {data.address.zipcode}</p>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <Phone className="text-gray-500 w-5 h-5" />
                    <a href={`tel:${data.phone}`} className="text-blue-600 hover:underline">
                        {data.phone}
                    </a>
                </div>

                <div className="flex items-center space-x-3">
                    <Globe className="text-gray-500 w-5 h-5" />
                    <a href={`https://${data.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {data.website}
                    </a>
                </div>

                <div className="flex items-start space-x-3">
                    <Building2 className="text-gray-500 w-5 h-5 mt-1" />
                    <div>
                        <p className="font-medium text-gray-800">{data.company.name}</p>
                        <p className="text-gray-600 italic">{data.company.catchPhrase}</p>
                        <p className="text-gray-600">{data.company.bs}</p>
                    </div>
                </div>
            </div>
        </div></div>
    )
}

export default UserProfile